import { Client } from '../types/client';

const ClientUserAgentMap = {
  [Client.ClashMeta]: 'clash.meta',
  [Client.Clash]: 'clash',
  [Client.Surge]: 'Surge iOS/3004',
  [Client.Shadowrocket]: 'Shadowrocket/1978 CFNetwork/1331.0.7 Darwin/21.4.0',
  [Client.QuantumultX]: 'Quantumult%20X/1.0.29 (iPhone14,5; iOS 15.4.1)',
  [Client.Shadowsocks]:
    'Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
};

export const getClientUserAgent = (client: Client) => {
  return ClientUserAgentMap[client];
};
