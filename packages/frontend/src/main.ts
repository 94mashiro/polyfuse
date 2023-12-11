import '@vant/touch-emulator';
import 'virtual:uno.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import './styles/style.css';
import './styles/base.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import App from './App.vue';
import RulePage from './pages/Rule.vue';
import SettingPage from './pages/Setting.vue';
import ServerEndpointPage from './pages/setting/ServerEndpoint.vue';
import SubscriptionPage from './pages/Subscription.vue';
import CollectionEditPage from './pages/subscription/CollectionEdit.vue';
import SubscriptionEditPage from './pages/subscription/SubscriptionEdit.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: SubscriptionPage, meta: { name: '订阅', showBottomMenu: true } },
  {
    path: '/subscription/create',
    component: SubscriptionEditPage,
    name: 'SubscriptionCreatePage',
    meta: { name: '新建订阅', showBottomMenu: false, backPath: '/' },
  },
  {
    path: '/subscription/edit/:id',
    component: SubscriptionEditPage,
    name: 'SubscriptionEditPage',
    meta: { name: '编辑订阅', showBottomMenu: false, backPath: '/' },
  },
  {
    path: '/collection/create',
    component: CollectionEditPage,
    name: 'CollectionCreatePage',
    meta: { name: '新建订阅组', showBottomMenu: false, backPath: '/' },
  },
  {
    path: '/collection/edit/:id',
    component: CollectionEditPage,
    name: 'CollectionEditPage',
    meta: { name: '编辑订阅组', showBottomMenu: false, backPath: '/' },
  },
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
  history: createWebHashHistory(),
  routes,
});
const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
