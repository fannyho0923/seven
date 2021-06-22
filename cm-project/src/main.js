// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./js/store";
import router from "./router";
import App from "./App";
import VueCookies from "vue-cookies";
import PortalVue from "portal-vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import DatePicker from "vue2-datepicker";
// import { VueDatePicker } from "@mathieustan/vue-datepicker";
// import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
// import { $cookies } from "vue/types/umd";

// import { routes } from "./router"; //路由規則
// Vue.use(PortalVue);
// Vue.use(VueDatePicker);
Vue.use(DatePicker);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.prototype.$PortalVue = PortalVue;
Vue.use(BootstrapVue);
/* eslint-disable no-new */
new Vue({
  store,
  el: "#app",
  router,
  render: h => h(App)
});
router.beforeEach((to, from, next) => {
  const isLogin = $cookies.get("token") == store.getters.userSeriel;
  console.log($cookies.get("token"));
  console.log(store.getters.userSeriel);
  if (isLogin) {
    console.log("userSeriel:" + store.getters.userSeriel);
    next();
  } else {
    if (to.path !== "/home") next("/home");
    else next();
  }
});
