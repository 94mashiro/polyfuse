export enum NodeProtocol {
  Shadowsocks = 'shadowsocks',
}

export interface ShadowsocksNode {
  type: NodeProtocol.Shadowsocks;
  data: {
    method: string;
    password: string;
    host: string;
    port: string;
    name: string;
  };
}

export type Node = ShadowsocksNode;
