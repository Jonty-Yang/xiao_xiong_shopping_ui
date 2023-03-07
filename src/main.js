import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from "vue-axios"
import axios from "axios";
import ElementUI from'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


// 全局路由守卫


// 每个请求都设置携带token凭证
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.token = store.state.token
  }
  return config
})

//刷新保存状态
if (sessionStorage.getItem("store")) {
  store.replaceState(
      Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store"))
      )
  );
  sessionStorage.removeItem("store")
}
//监听，在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state));
});

Vue.use(ElementUI)
axios.defaults.baseURL='http://localhost:9999'
Vue.use(VueAxios, axios)   // 装载axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
