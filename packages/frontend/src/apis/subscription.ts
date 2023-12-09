import { Subscription, SubscriptionMetadata } from '../types/subscription';
import { get } from '../utils/http';

type SubscriptionListRes = Subscription[];

interface SubscriptionMetadataQuery {
  id: string;
}

export const getSubscriptionList = () => get<SubscriptionListRes>('/api/subscription/list');

export const getSubscriptionMetadata = (query: SubscriptionMetadataQuery) =>
  get<SubscriptionMetadata>('/api/subscription/metadata', {
    params: query,
  });
