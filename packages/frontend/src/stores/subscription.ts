import { defineStore } from 'pinia';
import { useRequest } from 'vue-request';

import { getSubscriptionList } from '../apis/subscription.ts';
import { Subscription, SubscriptionMetadata } from '../types/subscription.ts';

interface SubscriptionStoreState {
  subscriptions: Subscription[];
  subMetadata: Record<string, SubscriptionMetadata>;
  loadingSubscriptions: boolean;
}

export const useSubscriptionStore = defineStore('subscription', {
  state: (): SubscriptionStoreState => ({
    subscriptions: [],
    subMetadata: {},
    loadingSubscriptions: false,
  }),
  actions: {
    async update() {
      const { runAsync } = useRequest(getSubscriptionList, {
        manual: true,
      });
      this.loadingSubscriptions = true;
      this.subscriptions = await runAsync();
      this.loadingSubscriptions = false;
    },
  },
});
