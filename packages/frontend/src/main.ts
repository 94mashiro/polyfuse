import '@vant/touch-emulator';
import 'virtual:uno.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import App from './App.vue';
import RulePage from './pages/Rule.vue';
import SettingPage from './pages/Setting.vue';
import ServerEndpointPage from './pages/setting/ServerEndpoint.vue';
import SubscriptionPage from './pages/Subscription.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: SubscriptionPage, meta: { name: '订阅', showBottomMenu: true } },
  { path: '/rule', component: RulePage, meta: { name: '分流', showBottomMenu: true } },
  {
    path: '/setting',
    component: SettingPage,
    meta: { name: '设置', showBottomMenu: true },
  },
  {
    path: '/setting/server-endpoint',
    component: ServerEndpointPage,
    meta: { name: '服务端配置', showBottomMenu: false, backPath: '/setting' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
