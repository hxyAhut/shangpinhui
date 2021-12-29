import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Typenav from '@/components/TypeNav/TypeNav.vue'
import "@/mock/mockServer"
// 引入swiper样式
import "swiper/css/swiper.css";
import Carousel from '@/components/Carousel';
// 引入分页器
import Pagination from '@/components/Pagination';
// 引入API
import * as API from '@/api';

// 使用element-ui
import {Button, MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;




// 注册全局组件
Vue.component(Typenav.name, Typenav)
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
