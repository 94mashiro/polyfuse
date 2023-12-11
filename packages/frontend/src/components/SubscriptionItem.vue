<template>
  <van-cell class="item" center :title="item.name">
    <template #label>
      <div class="text-xs">
        <div v-if="loadingMetadata && !metadata">加载中...</div>
        <div v-else-if="error">加载失败</div>
        <div v-else class="flex flex-col gap-0.5">
          <div class="flex items-center gap-1">
            <div class="i-mdi:speedometer" />
            <span>{{ metadataInfo.traffic }}</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="i-mdi:clock-time-eight-outline" />
            <span>{{ metadataInfo.expire }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #value>
      <div class="flex w-full justify-end gap-2">
        <PolicyOutputSheet :id="item.id" type="subscription" />
        <div class="i-mdi:pencil" @click="handleNavEditPage" />
        <SubscriptionDeleteDialog :id="item.id" type="subscription" @delete="id => emits('delete', id)" />
      </div>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
import byteSize from 'byte-size';
import { format } from 'date-fns';
import { computed, PropType } from 'vue';
import { useRequest } from 'vue-request';
import { useRouter } from 'vue-router';

import { getSubscriptionMetadata } from '../apis/subscription';
import { Subscription } from '../types/subscription';
import PolicyOutputSheet from './PolicyOutputSheet.vue';
import SubscriptionDeleteDialog from './SubscriptionDeleteDialog.vue';

const emits = defineEmits<{
  delete: [id: string];
}>();

const props = defineProps({
  item: {
    type: Object as PropType<Subscription>,
    required: true,
  },
});

const router = useRouter();

const {
  loading: loadingMetadata,
  data: metadata,
  error,
} = useRequest(
  () =>
    getSubscriptionMetadata({
      id: props.item?.id,
    }),
  {
    cacheKey: `subscriptionMetadata-${props.item.id}`,
  },
);

const metadataInfo = computed(() => {
  let traffic = '';
  let expire = '';
  if (!metadata.value?.total || !metadata.value?.upload || !metadata.value?.download) {
    traffic = '无流量数据';
  } else {
    traffic = `${byteSize(metadata.value.download + metadata.value.upload)} / ${byteSize(metadata.value.total)}`;
  }
  if (!metadata.value?.expire) {
    expire = '无过期时间';
  } else {
    expire = format(new Date(metadata.value.expire * 1000), 'yyyy-MM-dd');
  }
  return {
    traffic,
    expire,
  };
});

const handleNavEditPage = () => {
  router.replace(`/subscription/edit/${props.item.id}`);
};
</script>

<style scoped lang="scss">
.item:deep(.van-cell__title) {
  flex: 2 !important;
}
</style>
