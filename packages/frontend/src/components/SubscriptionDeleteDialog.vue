<template>
  <div class="i-mdi:delete" @click="handleClick" />
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import { PropType } from 'vue';

import { deleteCollection } from '../apis/collection.ts';
import { deleteSubscription } from '../apis/subscription.ts';
import { useCollectionStore } from '../stores/collection.ts';
import { useSubscriptionStore } from '../stores/subscription.ts';

const subscriptionStore = useSubscriptionStore();
const collectionStore = useCollectionStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'subscription' | 'collection'>,
    required: true,
  },
});

const handleClick = async () => {
  try {
    await showConfirmDialog({
      message: '确认删除？',
    });
    if (props.type === 'subscription') {
      await deleteSubscription({ id: props.id });
    } else {
      await deleteCollection({ id: props.id });
    }
  } finally {
    await Promise.all([subscriptionStore.update(), collectionStore.update()]);
  }
};
</script>