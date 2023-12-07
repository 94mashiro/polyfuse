import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    UnoCSS(),
  ],
});
