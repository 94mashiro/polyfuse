import { Client } from '../types/client';

const ClientUserAgentMap = {
  [Client.ClashMeta]: 'clash.meta',
  [Client.Clash]: 'clash',
  [Client.Surge]: 'Surge iOS/3004',
  [Client.Shadowrocket]: 'Shadowrocket/1978 CFNetwork/1331.0.7 Darwin/21.4.0',
  [Client.QuantumultX]: 'Quantumult%20X/1.0.29 (iPhone14,5; iOS 15.4.1)',
};

export const getClientUserAgent = (client: Client) => {
  return ClientUserAgentMap[client];
};
