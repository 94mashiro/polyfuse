<template>
  <van-nav-bar :title="route.meta.name ?? '标题'" :left-arrow="route.meta.backPath" @click-left="handleNavBack" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const handleNavBack = () => {
  if (!route.meta.backPath) {
    return;
  }
  router.replace(route.meta.backPath as string);
};
</script>
