<template>
  <van-form @submit="handleSubmit">
    <van-cell-group inset title="基本配置：">
      <van-field
        v-model="formState.name"
        :disabled="loadingGetCollectionDetail"
        required
        label="订阅组名称："
        placeholder="请输入需要展示的名称"
        :rules="[{ required: true, message: '请填写订阅组名称' }]"
        label-class="!w-24"
      />
    </van-cell-group>
    <SubscriptionCellCheckbox v-model="formState.subIds" />
    <div class="mt-8 px-4">
      <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="loadingCreateCollection || loadingUpdateCollection"
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

import { createCollection, getCollectionDetail, updateCollection } from '../apis/collection.ts';
import SubscriptionCellCheckbox from '../components/SubscriptionCellCheckbox.vue';

const route = useRoute();
const router = useRouter();

const { runAsync: startCreateCollection, loading: loadingCreateCollection } = useRequest(createCollection, {
  manual: true,
});
const { runAsync: startUpdateCollection, loading: loadingUpdateCollection } = useRequest(updateCollection, {
  manual: true,
});
const { runAsync: startGetCollectionDetail, loading: loadingGetCollectionDetail } = useRequest(getCollectionDetail, {
  manual: true,
});

const formState = reactive({
  name: '',
  subIds: [] as string[],
});

const isEditMode = computed(() => route.name === 'CollectionEditPage');

const handleSubmit = async () => {
  if (isEditMode.value) {
    await startUpdateCollection({
      id: route.params.id as string,
      name: formState.name,
      subIds: formState.subIds,
    });
    showNotify({ message: '编辑订阅组成功', type: 'success' });
    await router.replace('/');
    return;
  }
  await startCreateCollection(formState);
  showNotify({ message: '新建订阅组成功', type: 'success' });
  await router.replace('/');
};

onMounted(async () => {
  if (isEditMode.value) {
    const collectionId = route.params.id as string;
    showLoadingToast('数据载入中');
    const detail = await startGetCollectionDetail({
      id: collectionId,
    });
    closeToast();
    formState.name = detail.name;
    formState.subIds = detail.subscriptions.map(sub => sub.subscription.id);
  }
});
</script>
