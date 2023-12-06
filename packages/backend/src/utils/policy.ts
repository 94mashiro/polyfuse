import { QuantumultXPolicy, SurgePolicy } from '../types/client';

export const getQuantumultXPolicyString = (data: QuantumultXPolicy) => {
  const policyPairs = [];
  policyPairs.push(`${data.protocol}=${data.host}:${data.port}`);
  policyPairs.push(`method=${data.method}`);
  policyPairs.push(`password=${data.password}`);
  policyPairs.push(`udp-relay=${data.udpRelay}`);
  policyPairs.push(`tag=${data.tag}`);
  return policyPairs.join(',');
};

export const getSurgePolicyString = (data: SurgePolicy) => {
  const policyPairs = [];
  policyPairs.push(`${data.tag}=${data.protocol}`);
  policyPairs.push(data.host);
  policyPairs.push(data.port);
  policyPairs.push(`encrypt-method=${data.method}`);
  policyPairs.push(`password=${data.password}`);
  policyPairs.push(`udp-relay=${data.udpRelay}`);
  return policyPairs.join(',');
};
