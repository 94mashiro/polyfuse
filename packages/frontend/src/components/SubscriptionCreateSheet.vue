<template>
  <van-floating-bubble axis="lock" :offset="bubblePosition" @click="isSheetVisible = true">
    <div class="i-mdi:plus text-2xl" />
  </van-floating-bubble>
  <van-action-sheet
    v-model:show="isSheetVisible"
    description="选择添加的类型"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @select="handleSelectAction"
  />
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

interface SheetAction {
  name: string;
}

const router = useRouter();
const windowSize = useWindowSize();

const bubblePosition = computed(() => ({
  x: windowSize.width.value - 60,
  y: windowSize.height.value - 110,
}));

const isSheetVisible = ref<boolean>(false);

const actions: SheetAction[] = [{ name: '订阅' }, { name: '订阅组' }];

const handleSelectAction = (action: SheetAction) => {
  try {
    if (action.name === '订阅') {
      router.push('/subscription/create');
    }
    if (action.name === '订阅组') {
      router.push('/collection/create');
    }
  } finally {
    isSheetVisible.value = false;
  }
};
</script>