export enum Client {
  Surge = 'surge',
  Shadowrocket = 'shadowrocket',
  Clash = 'clash',
  ClashMeta = 'clash_meta',
  QuantumultX = 'quantumult_x',
  Shadowsocks = 'shadowsocks',
}

export interface QuantumultXPolicy {
  host: string;
  port: string;
  cipher: string;
  password: string;
  udpRelay?: boolean;
  tag: string;
  protocol: string;
  plugin?: string;
  pluginOptions?: Record<string, string>;
}

export interface SurgePolicy {
  host: string;
  port: string;
  cipher: string;
  password: string;
  udpRelay?: boolean;
  tag: string;
  protocol: string;
  plugin?: string;
  pluginOptions?: Record<string, string>;
}

export interface ClashPolicy {
  name: string;
  type: string;
  server: string;
  port: number;
  cipher: string;
  password: string;
  udp: boolean;
}
