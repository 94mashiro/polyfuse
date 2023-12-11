<template>
  <van-config-provider
    class="relative flex h-full w-full flex-col font-sans antialiased"
    :theme-vars="themeVars"
    theme-vars-scope="global"
    :theme="isDark ? 'dark' : 'light'"
  >
    <div class="z-100 sticky top-0">
      <NavBar />
      <EndpointSettingNotice />
    </div>
    <div
      :class="twMerge('mx-auto w-full max-w-xl overflow-y-auto py-4', (route.meta.showBottomMenu as boolean) && 'pb-20')"
    >
      <slot />
    </div>
    <BottomMenu v-if="route.meta.showBottomMenu" />
  </van-config-provider>
</template>

<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core';
import { twMerge } from 'tailwind-merge';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import { useUpdateVersion } from '../hooks/useUpdateVersion';
import { initEndpointSetting } from '../utils/setting.ts';
import BottomMenu from './BottomMenu.vue';
import EndpointSettingNotice from './EndpointSettingNotice.vue';
import NavBar from './NavBar.vue';

const isDark = usePreferredDark();
const route = useRoute();

const themeVars = reactive({});
const { update } = useUpdateVersion();

onMounted(() => {
  initEndpointSetting();
  update();
});
</script>
