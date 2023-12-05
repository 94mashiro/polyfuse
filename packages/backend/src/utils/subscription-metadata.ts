export const parseSubscriptionRawMetadata = (rawData: string) => {
  const metadata = {
    upload: null,
    download: null,
    total: null,
    expire: null,
  };
  try {
    const dataPairs = rawData.split('; ').map(pair => pair.split('='));
    dataPairs.forEach(data => {
      const [key, value] = data;
      metadata[key] = value;
    });
  } finally {
    return metadata;
  }
};
