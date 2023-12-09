<template>
  <van-cell-group inset title="包含的订阅：">
    <van-skeleton v-if="loadingSubscriptionList" class="my-6" :row="3" />
    <van-empty v-else-if="!subList?.length" image="error" :image-size="64" description="暂无订阅信息，请添加" />
    <van-checkbox-group v-else v-model="value">
      <van-cell v-for="(item, index) in subList" :key="item.id" :title="item.name" clickable @click="toggleCell(index)">
        <template #right-icon>
          <van-checkbox :ref="el => (checkboxRefs[index] = el)" :name="item.id" @click.stop />
        </template>
      </van-cell>
    </van-checkbox-group>
  </van-cell-group>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { useRequest } from 'vue-request';

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(['update:modelValue']);

import { getSubscriptionList } from '../apis/subscription.ts';

const checkboxRefs = ref<any[]>([]);

const { data: subList, loading: loadingSubscriptionList } = useRequest(getSubscriptionList);

const value = computed({
  get: () => props.modelValue,
  set: val => {
    emit('update:modelValue', val);
  },
});

const toggleCell = (index: number) => {
  checkboxRefs.value[index].toggle();
};
</script>