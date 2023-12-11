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
    <div class="mt-8 px-4">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="loadingCreateSubscription || loadingUpdateSubscription"
        >提交</van-button
      >
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { closeToast, showLoadingToast, showNotify } from 'vant';
import { computed, onMounted, reactive } from 'vue';
import { useRequest } from 'vue-request';
import { useRoute, useRouter } from 'vue-router';

import { createSubscription, getSubscriptionDetail, updateSubscription } from '../apis/subscription';
import { useSubscriptionStore } from '../stores/subscription.ts';

const route = useRoute();
const router = useRouter();

const subscriptionStore = useSubscriptionStore();

const { runAsync: startCreateSubscription, loading: loadingCreateSubscription } = useRequest(createSubscription, {
  manual: true,
});
const { runAsync: startUpdateSubscription, loading: loadingUpdateSubscription } = useRequest(updateSubscription, {
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
  try {
    if (isEditMode.value) {
      await startUpdateSubscription({
        id: route.params.id as string,
        name: formState.name,
        url: formState.url,
        userAgent: formState.userAgent,
      });
      showNotify({ message: '更新订阅成功', type: 'success' });
      await router.replace('/');
      return;
    }
    await startCreateSubscription(formState);
    showNotify({ message: '新建订阅成功', type: 'success' });
    await router.replace('/');
  } finally {
    await subscriptionStore.update();
  }
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
