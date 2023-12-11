export enum NodeProtocol {
  Shadowsocks = 'shadowsocks',
}

export interface ShadowsocksNode {
  type: NodeProtocol.Shadowsocks;
  data: {
    cipher: string;
    password: string;
    host: string;
    port: string;
    name: string;
    plugin?: string;
    pluginOptions?: Record<string, string>;
  };
}

export type Node = ShadowsocksNode;
