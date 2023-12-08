<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" replace to="/">
      <span>订阅</span>
      <template #icon>
        <div class="i-carbon:edge-node-alt" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/rule">
      <span>分流</span>
      <template #icon>
        <div class="i-mdi:script-text-outline" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/setting">
      <span>设置</span>
      <template #icon>
        <div class="i-mdi:cog" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
</script>
