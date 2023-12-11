<template>
  <van-cell-group title="订阅列表" inset>
    <van-skeleton v-if="subscriptionStore.loadingSubscriptions" class="my-6" title :row="3" />
    <van-empty
      v-else-if="!subscriptionStore.subscriptions?.length"
      image="error"
      :image-size="64"
      description="暂无订阅信息，请添加"
    />
    <SubscriptionItem v-for="item in subscriptionStore.subscriptions" v-else :key="item.id" :item="item" />
  </van-cell-group>
  <van-cell-group title="订阅组列表" inset>
    <van-skeleton v-if="loadingCollection" class="my-6" title :row="3" />
    <van-empty
      v-else-if="!collectionList?.length"
      image="error"
      :image-size="64"
      description="暂无订阅组信息，请添加"
    />
    <CollectionItem v-for="item in collectionList" v-else :key="item.id" :item="item" />
  </van-cell-group>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRequest } from 'vue-request';

import { getCollectionList } from '../apis/collection.ts';
import { useSubscriptionStore } from '../stores/subscription.ts';
import CollectionItem from './CollectionItem.vue';
import SubscriptionItem from './SubscriptionItem.vue';

const { data: collectionList, loading: loadingCollection } = useRequest(getCollectionList);

const subscriptionStore = useSubscriptionStore();

onMounted(() => {
  subscriptionStore.update();
});
</script>
