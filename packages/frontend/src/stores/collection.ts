import { defineStore } from 'pinia';
import { useRequest } from 'vue-request';

import { getCollectionList } from '../apis/collection.ts';
import { Collection } from '../types/collection.ts';

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collections: [] as Collection[],
    loadingCollections: false,
  }),
  actions: {
    async update() {
      const { runAsync } = useRequest(getCollectionList, {
        manual: true,
      });
      if (this.collections.length === 0) {
        this.loadingCollections = true;
      }
      this.collections = await runAsync();
      this.loadingCollections = false;
    },
  },
});
