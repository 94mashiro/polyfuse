export enum Client {
  Surge = 'surge',
  Shadowrocket = 'shadowrocket',
  Clash = 'clash',
  ClashMeta = 'clash_meta',
  QuantumultX = 'quantumult_x',
}

export interface QuantumultXPolicy {
  host: string;
  port: string;
  method: string;
  password: string;
  udpRelay: boolean;
  tag: string;
  protocol: string;
}
