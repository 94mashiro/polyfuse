import { camelCase } from 'lodash';

export const parseShadowsocksPlugin = (data?: string) => {
  if (!data) {
    return {};
  }
  const [plugin, ...pluginOptionsStr] = data.split(';');
  const pluginOptions = pluginOptionsStr.reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    return {
      ...acc,
      [camelCase(key)]: value,
    };
  }, {});
  return {
    plugin,
    pluginOptions,
  };
};
