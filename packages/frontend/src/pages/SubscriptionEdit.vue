<template>
  <van-form @submit="handleSubmit">
    <van-cell-group inset title="基本配置：">
      <van-field
        v-model="formState.name"
        :disabled="loadingGetSubscriptionDetail"
        required
        label="订阅名称："
        placeholder="请输入需要展示的名称"
        :rules="[{ required: true, message: '请填写订阅名称' }]"
      />
      <van-field
        v-model="formState.url"
        :disabled="loadingGetSubscriptionDetail"
        required
        label="订阅地址："
        placeholder="使用原始订阅链接效果更佳"
        :rules="[{ required: true, message: '请填写订阅地址' }]"
      />
      <van-field v-model="formState.userAgent" :disabled="loadingGetSubscriptionDetail" label="自定义 UA：" />
    </van-cell-group>
    <div class="mt-4 px-4">
      <van-button round block type="primary" native-type="submit" :loading="loadingCreateSubscription">提交</van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { closeToast, showLoadingToast, showNotify } from 'vant';
import { computed, onMounted, reactive } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute, useRouter } from 'vue-router';

import { createSubscription, getSubscriptionDetail } from '../apis/subscription';

const route = useRoute();
const router = useRouter();

const { runAsync: startCreateSubscription, loading: loadingCreateSubscription } = useRequest(createSubscription, {
  manual: true,
});
const { runAsync: startGetSubscriptionDetail, loading: loadingGetSubscriptionDetail } = useRequest(
  getSubscriptionDetail,
  {
    manual: true,
  },
);

const formState = reactive({
  name: '',
  url: '',
  userAgent: '',
});

const isEditMode = computed(() => route.name === 'SubscriptionEditPage');

const handleSubmit = async () => {
  if (isEditMode.value) {
    return;
  }
  await startCreateSubscription(formState);
  showNotify({ message: '新建订阅成功', type: 'success' });
  await router.replace('/');
};

onMounted(async () => {
  if (isEditMode.value) {
    const subId = route.params.id as string;
    showLoadingToast('数据载入中');
    const detail = await startGetSubscriptionDetail({
      id: subId,
    });
    closeToast();
    formState.name = detail.name;
    formState.url = detail.url;
    formState.userAgent = detail.userAgent;
  }
});
</script>
