import { Subscription } from './subscription.ts';

export interface Collection {
  id: string;
  name: string;
  subscriptions: {
    subscription: Subscription;
  }[];
}
