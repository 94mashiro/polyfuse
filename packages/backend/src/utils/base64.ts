export const isBase64String = (str: string) => {
  const detect = (str: string) => Buffer.from(str, 'base64').toString('base64') === str;
  return detect(str) || detect(str + '==');
};
