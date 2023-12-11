<template>
  <div class="flex flex-col gap-4">
    <div>
      <van-cell-group inset>
        <van-cell title="当前服务端版本" :value="!appStore.version && loading ? '获取中' : appStore.versionString" />
        <van-cell title="如何部署服务端" is-link value="点我查看" />
      </van-cell-group>
    </div>
    <div>
      <van-cell-group inset>
        <van-field v-model="endpointSetting.url" required label="服务端地址" placeholder="请输入服务端地址" />
        <van-field v-model="endpointSetting.token" label="鉴权密钥" placeholder="请输入鉴权密钥" />
      </van-cell-group>
    </div>
    <div class="mx-4">
      <van-button round block type="primary" :loading="loading" @click="handleSubmit">提交</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showNotify } from 'vant';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useUpdateVersion } from '../../hooks/useUpdateVersion';
import { useAppStore } from '../../stores/app';
import { getServerEndpointSetting, setServerEndpointSetting } from '../../utils/setting';

const appStore = useAppStore();
const endpointSetting = reactive(getServerEndpointSetting());
const { loading, update } = useUpdateVersion();
const router = useRouter();

const handleSubmit = async () => {
  setServerEndpointSetting({
    url: endpointSetting.url,
    token: endpointSetting.token,
  });
  await router.replace('/setting');
  await update();
  showNotify({ message: '编辑服务端配置成功', type: 'success' });
};

onMounted(() => {
  update();
});
</script>
