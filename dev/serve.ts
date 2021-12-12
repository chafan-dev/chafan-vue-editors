import Vue, { VNode } from 'vue';
import Serve from './Serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import ChafanVueEditors from '@/entry.esm';
Vue.use(ChafanVueEditors);

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Serve),
}).$mount('#app');
