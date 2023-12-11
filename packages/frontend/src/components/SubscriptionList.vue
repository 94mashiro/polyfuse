<template>
  <van-cell-group title="订阅列表" inset>
    <van-skeleton v-if="loadingSubscriptions && !subscriptions?.length" class="my-6" title :row="3" />
    <van-empty
      v-else-if="isFetchSubsError"
      image="error"
      :image-size="64"
      description="获取订阅信息失败，请检查服务端配置"
    />
    <van-empty v-else-if="!subscriptions?.length" image="error" :image-size="64" description="暂无订阅信息，请添加" />
    <SubscriptionItem v-for="item in subscriptions" v-else :key="item.id" :item="item" @delete="refreshSubscriptions" />
  </van-cell-group>
  <van-cell-group title="订阅组列表" inset>
    <van-skeleton v-if="loadingCollections && !collections?.length" class="my-6" title :row="3" />
    <van-empty
      v-else-if="isFetchCollectionsError"
      image="error"
      :image-size="64"
      description="获取订阅组信息失败，请检查服务端配置"
    />
    <van-empty v-else-if="!collections?.length" image="error" :image-size="64" description="暂无订阅组信息，请添加" />
    <CollectionItem v-for="item in collections" v-else :key="item.id" :item="item" @delete="refreshCollections" />
  </van-cell-group>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';

import { getCollectionList } from '../apis/collection.ts';
import { getSubscriptionList } from '../apis/subscription.ts';
import CollectionItem from './CollectionItem.vue';
import SubscriptionItem from './SubscriptionItem.vue';

const {
  data: subscriptions,
  loading: loadingSubscriptions,
  error: isFetchSubsError,
  refreshAsync: refreshSubscriptions,
} = useRequest(getSubscriptionList, {
  cacheKey: 'subscriptionList',
});
const {
  data: collections,
  loading: loadingCollections,
  error: isFetchCollectionsError,
  refreshAsync: refreshCollections,
} = useRequest(getCollectionList, {
  cacheKey: 'collectionList',
});
</script>
