import { getServerEndpointSetting } from './setting';

export const generatePolicyOutputUrl = (options: { id: string; client: string }) => {
  const endpointSetting = getServerEndpointSetting();

  if (!endpointSetting?.url) {
    throw new Error('Endpoint setting is not found');
  }
  return `${endpointSetting.url}/api/output/policy?id=${options.id}&client=${options.client}&token=${endpointSetting.token}`;
};
