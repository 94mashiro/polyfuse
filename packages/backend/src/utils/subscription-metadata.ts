import { SubscriptionMetadata } from '../types/metadata';

export const parseSubscriptionRawMetadata = (rawData: string): SubscriptionMetadata => {
  const metadata: SubscriptionMetadata = {
    upload: null,
    download: null,
    total: null,
    expire: null,
  };
  try {
    const dataPairs = rawData.split('; ').map(pair => pair.split('='));
    dataPairs.forEach(data => {
      const [key, value] = data;
      metadata[key] = Number(value);
    });
  } finally {
    return metadata;
  }
};
