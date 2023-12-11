<template>
  <div class="i-mdi:share-variant" @click="handleClickTrigger" />
  <van-share-sheet
    v-model:show="showShare"
    class="share-sheet"
    title="选择使用的客户端"
    :options="options"
    @select="handleSelect"
  />
</template>

<script setup lang="ts">
import clipboardy from 'clipboardy';
import { showNotify } from 'vant';
import { PropType, ref } from 'vue';

import { generatePolicyOutputUrl } from '../utils/policy';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'subscription' | 'collection'>,
    default: 'subscription',
  },
});

interface ShareOption {
  name: string;
  icon: string;
  client: string;
}

const showShare = ref<boolean>(false);

const options: ShareOption[] = [
  {
    name: 'Quantumult X',
    icon: '/logo/qx.png',
    client: 'qx',
  },
  {
    name: 'Clash',
    icon: '/logo/clash.png',
    client: 'clash',
  },
  {
    name: 'Clash Meta',
    icon: '/logo/clash-meta.png',
    client: 'clash_meta',
  },
  {
    name: 'Surge',
    icon: '/logo/surge.png',
    client: 'surge',
  },
  {
    name: 'Stash',
    icon: '/logo/stash.png',
    client: 'stash',
  },
];

const handleClickTrigger = () => {
  showShare.value = true;
};

const handleSelect = async (option: ShareOption) => {
  const policyUrl = generatePolicyOutputUrl({
    id: props.id,
    client: option.client,
    type: props.type,
  });
  try {
    await clipboardy.write(policyUrl);
  } catch {
    window.open(policyUrl, '_blank');
  }
  showShare.value = false;
  showNotify({ message: '订阅复制成功', type: 'success' });
};
</script>

<style lang="scss" scoped>
.share-sheet {
  :global(.van-share-sheet__image-icon) {
    @apply rounded-xl;
  }
}
</style>
