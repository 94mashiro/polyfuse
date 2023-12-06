import { QuantumultXPolicy } from '../types/client';

export const getQuantumultXPolicyString = (data: QuantumultXPolicy) => {
  const policyPairs = [];
  policyPairs.push(`${data.protocol}=${data.host}:${data.port}`);
  policyPairs.push(`method=${data.method}`);
  policyPairs.push(`password=${data.password}`);
  policyPairs.push(`udp-relay=${data.udpRelay}`);
  policyPairs.push(`tag=${data.tag}`);
  return policyPairs.join(',');
};
