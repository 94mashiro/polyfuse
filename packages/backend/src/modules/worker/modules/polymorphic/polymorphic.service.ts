import { HttpException, Injectable } from '@nestjs/common';
import { stringify } from 'yaml';

import { ClashPolicy, Client, QuantumultXPolicy, SurgePolicy } from '@/types/client';
import { Node, NodeProtocol, ShadowsocksNode } from '@/types/node';
import { SubscriptionProtocol } from '@/types/subscription';
import { parseShadowsocksPlugin } from '@/utils/node';
import { getQuantumultXPolicyString, getSurgePolicyString } from '@/utils/policy';

@Injectable()
export class PolymorphicService {
  constructor() {}

  parseSubscription(params: { data: string; protocol: SubscriptionProtocol }) {
    if (params.protocol === SubscriptionProtocol.Shadowsocks) {
      return this.parseShadowsocks(params.data);
    }
    throw new HttpException('Unsupported subscription protocol', 400);
  }

  generatePolicy(params: { nodes: Node[]; client: Client }) {
    if (params.client === Client.QuantumultX) {
      return this.generateQuantumultX(params.nodes);
    }
    if (params.client === Client.Surge) {
      return this.generateSurge(params.nodes);
    }
    if (params.client === Client.Clash) {
      return this.generateClash(params.nodes);
    }
    throw new HttpException('Unsupported client', 400);
  }

  parseShadowsocks(data: string): ShadowsocksNode[] {
    const decodedData = decodeURIComponent(atob(data));
    const splitSeparator = decodedData.includes('\r\n') ? '\r\n' : '\n';
    const decodedUriList = decodeURIComponent(atob(data)).split(splitSeparator);
    const parseUri = (uri: string) => {
      try {
        const parsedUri = new URL(uri);
        const pluginQuery = parsedUri.searchParams.get('plugin');
        const { plugin, pluginOptions } = parseShadowsocksPlugin(pluginQuery);
        const [cipher, password] = atob(parsedUri.username).split(':');
        return {
          type: NodeProtocol.Shadowsocks,
          data: {
            host: parsedUri.hostname,
            port: parsedUri.port,
            name: decodeURIComponent(parsedUri.hash.slice(1)),
            cipher,
            password,
            plugin,
            pluginOptions,
          },
        };
      } catch {}
    };
    return decodedUriList.map(parseUri).filter(Boolean);
  }

  generateQuantumultX(nodes: Node[]) {
    const qxPolicyList = nodes.map(({ type, data }) => {
      switch (type) {
        case NodeProtocol.Shadowsocks: {
          const policyData: QuantumultXPolicy = {
            host: data.host,
            port: data.port,
            cipher: data.cipher,
            protocol: 'shadowsocks',
            password: data.password,
            tag: data.name,
            plugin: data.plugin,
            pluginOptions: data.pluginOptions,
          };
          return getQuantumultXPolicyString(policyData);
        }
        default: {
          return null;
        }
      }
    });
    return qxPolicyList.filter(Boolean).join(`\n`);
  }

  generateSurge(nodes: Node[]) {
    const surgePolicyList = nodes.map(({ type, data }) => {
      switch (type) {
        case NodeProtocol.Shadowsocks: {
          const policyData: SurgePolicy = {
            host: data.host,
            port: data.port,
            cipher: data.cipher,
            protocol: 'ss',
            password: data.password,
            tag: data.name,
            plugin: data.plugin,
            pluginOptions: data.pluginOptions,
          };
          return getSurgePolicyString(policyData);
        }
        default: {
          return null;
        }
      }
    });
    return surgePolicyList.filter(Boolean).join(`\n`);
  }

  generateClash(nodes: Node[]) {
    const surgePolicyList = nodes.map(({ type, data }) => {
      switch (type) {
        case NodeProtocol.Shadowsocks: {
          const policyData: ClashPolicy = {
            name: data.name,
            type: 'ss',
            server: data.host,
            port: Number(data.port),
            cipher: data.cipher,
            password: data.password,
            udp: true,
          };
          return policyData;
        }
        default: {
          return null;
        }
      }
    });
    return stringify({
      proxies: surgePolicyList.filter(Boolean).map(policy => JSON.stringify(policy)),
    });
  }
}
