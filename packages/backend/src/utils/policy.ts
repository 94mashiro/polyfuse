import { QuantumultXPolicy, SurgePolicy } from '../types/client';

export const getQuantumultXPolicyString = (data: QuantumultXPolicy) => {
  const policyPairs = [];
  policyPairs.push(`${data.protocol}=${data.host}:${data.port}`);
  policyPairs.push(`method=${data.cipher}`);
  policyPairs.push(`password=${data.password}`);
  if (data.udpRelay) {
    policyPairs.push(`udp-relay=${data.udpRelay}`);
  }
  if (['obfs-local', 'simple-obfs'].includes(data.plugin)) {
    policyPairs.push(`obfs=${data.pluginOptions.obfs}`);
    policyPairs.push(`obfs-host=${data.pluginOptions.obfsHost}`);
  }
  policyPairs.push(`tag=${data.tag}`);
  return policyPairs.join(',');
};

export const getSurgePolicyString = (data: SurgePolicy) => {
  const policyPairs = [];
  policyPairs.push(`${data.tag}=${data.protocol}`);
  policyPairs.push(data.host);
  policyPairs.push(data.port);
  policyPairs.push(`encrypt-method=${data.cipher}`);
  policyPairs.push(`password=${data.password}`);
  if (data.udpRelay) {
    policyPairs.push(`udp-relay=${data.udpRelay}`);
  }
  if (['obfs-local', 'simple-obfs'].includes(data.plugin)) {
    policyPairs.push(`obfs=${data.pluginOptions.obfs}`);
    policyPairs.push(`obfs-host=${data.pluginOptions.obfsHost}`);
  }
  return policyPairs.join(',');
};
