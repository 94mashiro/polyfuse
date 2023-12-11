<template>
  <div class="i-mdi:delete" @click="handleClick" />
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import { PropType } from 'vue';

import { deleteCollection } from '../apis/collection.ts';
import { deleteSubscription } from '../apis/subscription.ts';

const emits = defineEmits<{
  delete: [id: string];
}>();

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
    emits('delete', props.id);
  }
};
</script>