import { HttpException, Injectable } from '@nestjs/common';
import parseUrl from 'parse-url';
import { stringify } from 'yaml';

import { Client } from '../../../../types/client';
import { Node, NodeProtocol } from '../../../../types/node';
import { SubscriptionFormat } from '../../../../types/subscription';
import { parseShadowsocksPlugin } from '../../../../utils/node';
import { getClashPolicyString, getQuantumultXPolicyString, getSurgePolicyString } from '../../../../utils/policy';

@Injectable()
export class PolymorphicService {
  constructor() {}

  parseSubscription(params: { data: string; protocol: SubscriptionFormat }) {
    if (params.protocol === SubscriptionFormat.SIP002) {
      return this.parseSIP002(params.data);
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
    if ([Client.Clash, Client.ClashMeta, Client.Stash].includes(params.client)) {
      return this.generateClash(params.nodes);
    }
    throw new HttpException('Unsupported client', 400);
  }

  parseSIP002(data: string): Node[] {
    const decodedData = decodeURIComponent(atob(data));
    const splitSeparator = decodedData.includes('\r\n') ? '\r\n' : '\n';
    const decodedUriList = decodeURIComponent(atob(data))
      .split(splitSeparator)
      .map(uri => uri.trim());

    const getShadowsocksNode = (uri: ReturnType<typeof parseUrl>): Node => {
      const pluginQuery = uri.query.plugin;
      const { plugin, pluginOptions } = parseShadowsocksPlugin(pluginQuery);
      const [cipher, password] = atob(uri.user).split(':');
      return {
        type: NodeProtocol.Shadowsocks,
        host: uri.resource,
        port: uri.port,
        name: decodeURIComponent(uri.hash),
        cipher,
        password,
        plugin,
        pluginOptions,
      };
    };
    const getTrojanNode = (uri: ReturnType<typeof parseUrl>): Node => {
      return {
        type: NodeProtocol.Trojan,
        host: uri.resource,
        port: uri.port,
        name: decodeURIComponent(uri.hash),
        password: uri.user,
        sni: uri.query.peer,
        skipCertVerify: uri.query['allowInsecure'] === '1',
        tcpFastOpen: uri.query.tfo === '1',
        tls: true,
      };
    };

    const parseUri = (uri: string) => {
      try {
        const parsedUri = parseUrl(uri);
        console.log(parsedUri);
        if (parsedUri.protocol === 'ss') {
          return getShadowsocksNode(parsedUri);
        }
        if (parsedUri.protocol === 'trojan') {
          return getTrojanNode(parsedUri);
        }
      } catch (e) {
        console.log(e);
      }
    };

    return decodedUriList.map(parseUri).filter(Boolean);
  }

  generateQuantumultX(nodes: Node[]) {
    const qxPolicyList = nodes.map(node => {
      return getQuantumultXPolicyString(node);
    });
    return qxPolicyList.filter(Boolean).join(`\n`);
  }

  generateSurge(nodes: Node[]) {
    const surgePolicyList = nodes.map(node => {
      return getSurgePolicyString(node);
    });
    return surgePolicyList.filter(Boolean).join(`\n`);
  }

  generateClash(nodes: Node[]) {
    const surgePolicyList = nodes.map(node => {
      return getClashPolicyString(node);
    });
    return stringify({
      proxies: surgePolicyList.filter(Boolean),
    });
  }
}
