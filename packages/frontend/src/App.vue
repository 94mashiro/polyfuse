<script setup lang="ts">
import Provider from './components/Provider.vue';
</script>

<template>
  <Provider>
    <RouterView />
  </Provider>
</template>

<style scoped lang="scss">
</style>

<style lang="scss">
html {
  @apply bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100;
}
</style>
