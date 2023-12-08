import { ref } from 'vue';
import { useRequest } from 'vue-request';

import { getServerEnv } from '../apis/server-endpoint';
import { useAppStore } from '../stores/app';
import { getServerEndpointSetting } from '../utils/setting';

export const useUpdateVersion = () => {
  const appStore = useAppStore();
  const isError = ref<boolean>(false);
  const { runAsync, loading } = useRequest(getServerEnv, {
    manual: true,
  });
  const update = async () => {
    try {
      const endpointSetting = getServerEndpointSetting();
      if (!endpointSetting.url) {
        isError.value = true;
      }
      const { version } = await runAsync();
      appStore.version = version;
    } catch (e) {
      appStore.version = '';
      isError.value = true;
    }
  };
  return {
    update,
    isError,
    loading,
  };
};
