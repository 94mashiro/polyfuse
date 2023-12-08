import transformerDirectives from '@unocss/transformer-directives';
import { defineConfig, presetAttributify, presetIcons, presetMini, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetAttributify({}), presetUno(), presetIcons(), presetMini()],
  transformers: [transformerDirectives()],
});
