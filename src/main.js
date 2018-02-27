import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br'
import App from './App.vue'
import VueMask from 'di-vue-mask'

import { routes } from './routes';


const router = new VueRouter({
  routes  
});

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI, { locale })
Vue.use(VueMask)


Vue.http.options.root = 'http://localhost:8180';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
