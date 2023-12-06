import { Injectable } from '@nestjs/common';

import { QuantumultXPolicy } from '@/types/client';
import { Node, NodeProtocol, ShadowsocksNode } from '@/types/node';
import { getQuantumultXPolicyString } from '@/utils/policy';

@Injectable()
export class PolymorphicService {
  constructor() {}

  parseGeneric(data: string): ShadowsocksNode[] {
    const decodedUriList = decodeURIComponent(atob(data)).split('\r\n');
    const parseUri = (uri: string) => {
      // 根据 ss 协议的模式，解析出各个部分
      const parseRegex = /ss:\/\/(.+)@(.+):(\d+)#(.+)/g;
      const matchParts = parseRegex.exec(uri);
      if (!matchParts) {
        return null;
      }
      // encodedData 部分需要二次 decode
      const [_, encodedData, host, port, name] = matchParts;
      const [method, password] = atob(encodedData).split(':');
      return {
        type: NodeProtocol.Shadowsocks,
        data: {
          method,
          password,
          host,
          port,
          name,
        },
      };
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
            method: data.method,
            protocol: 'shadowsocks',
            password: data.password,
            udpRelay: true,
            tag: data.name,
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
}
