import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import UnoCSS from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import { ConfigEnv, UserConfigExport } from 'vite';
import { viteVConsole } from 'vite-plugin-vconsole';

export default ({ mode }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      UnoCSS(),
      viteVConsole({
        entry: [path.resolve('src/main.ts')], // entry for each page, different from the above
        enabled: mode !== 'production',
        config: {
          maxLogNumber: 1000,
          theme: 'dark',
        },
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  };
};
