import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    version: '' as string,
  }),
  getters: {
    versionString: state => {
      return state.version || '获取失败，请检查配置';
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
