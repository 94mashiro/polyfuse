<template>
  <van-config-provider :theme-vars="themeVars" theme-vars-scope="global" :theme="isDark ? 'dark' : 'light'">
    <NavBar />
    <EndpointSettingNotice />
    <div class="mx-auto max-w-xl py-4">
      <slot />
      <BottomMenu v-if="route.meta.showBottomMenu" />
    </div>
  </van-config-provider>
</template>

<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import { useUpdateVersion } from '../hooks/useUpdateVersion';
import BottomMenu from './BottomMenu.vue';
import EndpointSettingNotice from './EndpointSettingNotice.vue';
import NavBar from './NavBar.vue';

const isDark = usePreferredDark();
const route = useRoute();

const themeVars = reactive({});
const { update } = useUpdateVersion();

onMounted(() => {
  update();
});
</script>
