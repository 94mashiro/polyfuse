<template>
  <van-cell-group inset>
    <van-cell
      title="服务端配置"
      :label="'当前版本：' + appStore.versionString"
      is-link
      center
      to="/setting/server-endpoint"
    />
  </van-cell-group>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/app';

const appStore = useAppStore();
</script>
