export interface Subscription {
  id: string;
  name: string;
  url: string;
  userAgent: string;
}

export interface SubscriptionMetadata {
  download: number | null;
  expire: number | null;
  upload: number | null;
  total: number | null;
}
