import { Node, NodeProtocol } from '../types/node';

const getQuantumultXProtocol = (data: Node) => {
  const protocolMap = {
    [NodeProtocol.Shadowsocks]: 'shadowsocks',
    [NodeProtocol.Trojan]: 'trojan',
  };
  return protocolMap[data.type];
};

const getSurgeProtocol = (data: Node) => {
  const protocolMap = {
    [NodeProtocol.Shadowsocks]: 'ss',
    [NodeProtocol.Trojan]: 'trojan',
  };
  return protocolMap[data.type];
};

export const getClashProtocol = (data: Node) => {
  const protocolMap = {
    [NodeProtocol.Shadowsocks]: 'ss',
    [NodeProtocol.Trojan]: 'trojan',
  };
  return protocolMap[data.type];
};

export const getQuantumultXPolicyString = (data: Node) => {
  const policyPairs = [];
  policyPairs.push(`${getQuantumultXProtocol(data)}=${data.host}:${data.port}`);
  policyPairs.push(`password=${data.password}`);
  if (data.cipher) {
    policyPairs.push(`method=${data.cipher}`);
  }
  if (data.udpRelay) {
    policyPairs.push(`udp-relay=${data.udpRelay}`);
  }
  if (['obfs-local', 'simple-obfs'].includes(data.plugin)) {
    policyPairs.push(`obfs=${data.pluginOptions.obfs}`);
    policyPairs.push(`obfs-host=${data.pluginOptions.obfsHost}`);
  }
  if (data.tls) {
    policyPairs.push(`over-tls=${data.tls}`);
  }
  if (data.sni) {
    policyPairs.push(`tls-host=${data.sni}`);
  }
  if (data.skipCertVerify) {
    policyPairs.push(`tls-verification=${data.skipCertVerify}`);
  }
  policyPairs.push(`tag=${data.name}`);
  return policyPairs.join(',');
};

export const getSurgePolicyString = (data: Node) => {
  const policyPairs = [];
  policyPairs.push(`${data.name}=${getSurgeProtocol(data)}`);
  policyPairs.push(data.host);
  policyPairs.push(data.port);
  if (data.cipher) {
    policyPairs.push(`encrypt-method=${data.cipher}`);
  }
  policyPairs.push(`password=${data.password}`);
  if (data.udpRelay) {
    policyPairs.push(`udp-relay=${data.udpRelay}`);
  }
  if (['obfs-local', 'simple-obfs'].includes(data.plugin)) {
    policyPairs.push(`obfs=${data.pluginOptions.obfs}`);
    policyPairs.push(`obfs-host=${data.pluginOptions.obfsHost}`);
  }
  if (data.tcpFastOpen) {
    policyPairs.push(`tfo=${data.tcpFastOpen}`);
  }
  if (data.tls) {
    policyPairs.push(`tls=${data.tls}`);
  }
  if (data.sni) {
    policyPairs.push(`tls-host=${data.sni}`);
  }
  if (data.skipCertVerify) {
    policyPairs.push(`skip-cert-verify=${data.skipCertVerify}`);
  }
  return policyPairs.join(',');
};

export const getClashPolicyString = (data: Node) => {
  const policyData = {
    name: data.name,
    type: getClashProtocol(data),
    server: data.host,
    port: Number(data.port),
    cipher: data.cipher,
    password: data.password,
    udp: data.udpRelay,
    sni: data.sni,
    tfo: data.tcpFastOpen,
    'skip-cert-verify': data.skipCertVerify,
  };
  if (['obfs-local', 'simple-obfs'].includes(data.plugin)) {
    policyData['plugin'] = 'obfs';
    policyData['plugin-opts'] = {
      mode: data.pluginOptions.obfs,
      host: data.pluginOptions.obfsHost,
    };
  }
  return JSON.stringify(policyData);
};
