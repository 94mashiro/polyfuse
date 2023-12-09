import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    // presetAttributify({}),
    // presetUno(),
    presetIcons(),
    // presetMini({
    //   dark: 'media',
    // }),
  ],
  transformers: [],
});
