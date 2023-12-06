export const isBase64String = (str: string) => {
  return Buffer.from(str, 'base64').toString('base64') === str;
};
