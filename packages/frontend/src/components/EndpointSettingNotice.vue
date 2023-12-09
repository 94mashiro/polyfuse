<template>
  <van-notice-bar
    v-if="isVisible"
    left-icon="info-o"
    text="检测到服务端配置异常，请去设置-服务端配置调整服务端地址，否则会影响部分功能的使用。"
    mode="closeable"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useAppStore } from '../stores/app';

const appStore = useAppStore();
const isVisible = computed(() => !appStore.version);
</script>
