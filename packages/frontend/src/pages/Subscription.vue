<template>
  <div>Subscription Page</div>
  <van-floating-bubble axis="lock" :offset="bubblePosition">
    <div class="i-mdi:plus text-2xl" />
  </van-floating-bubble>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { reactive } from 'vue';

const windowSize = useWindowSize();
const bubblePosition = reactive({
  x: windowSize.width.value - 60,
  y: windowSize.height.value - 110,
});
</script>
