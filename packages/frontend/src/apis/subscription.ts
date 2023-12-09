import { Subscription, SubscriptionMetadata } from '../types/subscription';
import { get, post } from '../utils/http';

type SubscriptionListRes = Subscription[];

interface SubscriptionMetadataQuery {
  id: string;
}

interface SubscriptionDetailQuery {
  id: string;
}

interface CreateSubscriptionBody {
  name: string;
  url: string;
  userAgent?: string;
}

interface UpdateSubscriptionBody {
  id: string;
  name: string;
  url: string;
  userAgent?: string;
}

export const getSubscriptionList = () => get<SubscriptionListRes>('/api/subscription/list');

export const getSubscriptionDetail = (query: SubscriptionDetailQuery) =>
  get<Subscription>('/api/subscription/detail', {
    params: query,
  });

export const getSubscriptionMetadata = (query: SubscriptionMetadataQuery) =>
  get<SubscriptionMetadata>('/api/subscription/metadata', {
    params: query,
  });

export const createSubscription = (body: CreateSubscriptionBody) => post<boolean>('/api/subscription/create', body);

export const updateSubscription = (body: UpdateSubscriptionBody) => post<boolean>('/api/subscription/update', body);
