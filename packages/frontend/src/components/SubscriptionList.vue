<template>
  <van-cell-group title="订阅列表" inset>
    <van-skeleton v-if="loadingSubscription" class="my-6" title :row="3" />
    <SubscriptionItem v-for="item in data" v-else :key="item.id" :item="item" />
  </van-cell-group>
  <van-cell-group title="订阅组列表" inset>
    <van-skeleton v-if="loadingSubscription" class="my-6" title :row="3" />

    <template v-else>
      <van-cell center title="单元格" value="内容" label="描述信息" />
      <van-cell center title="单元格" value="内容" label="描述信息" />
      <van-cell center title="单元格" value="内容" label="描述信息" />
      <van-cell center title="单元格" value="内容" label="描述信息" />
      <van-cell center title="单元格" value="内容" label="描述信息" />
    </template>
  </van-cell-group>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';

import { getSubscriptionList } from '../apis/subscription';
import SubscriptionItem from './SubscriptionItem.vue';
const { data, loading: loadingSubscription } = useRequest(getSubscriptionList);
</script>
