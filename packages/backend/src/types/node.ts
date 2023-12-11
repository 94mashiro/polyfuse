export enum NodeProtocol {
  Shadowsocks = 'shadowsocks',
  Trojan = 'trojan',
}

export interface Node extends ShadowsocksExtendOptions, TrojanNodeExtendOptions {
  type: NodeProtocol;
  password: string;
  host: string;
  port: string;
  name: string;
  udpRelay?: boolean;
  skipCertVerify?: boolean;
  tcpFastOpen?: boolean;
}

export interface ShadowsocksExtendOptions {
  cipher?: string;
  plugin?: string;
  pluginOptions?: Record<string, string>;
}

export interface TrojanNodeExtendOptions {
  sni?: string;
  tls?: boolean;
}
