<template>
  <van-tabbar class="bar" route>
    <van-tabbar-item icon="home-o" replace to="/">
      <span>订阅</span>
      <template #icon>
        <div class="i-carbon:edge-node-alt icon" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/rule">
      <span>分流</span>
      <template #icon>
        <div class="i-mdi:script-text-outline icon" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" replace to="/setting">
      <span>设置</span>
      <template #icon>
        <div class="i-mdi:cog icon" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.bar {
  .van-tabbar-item:not(.van-tabbar-item--active) {
    .icon {
      @apply dark:text-zinc-400 dark:brightness-200;
    }
  }
}
</style>