// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import App from "./App";
import VueCookies from "vue-cookies";
import PortalVue from "portal-vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import { $cookies } from "vue/types/umd";

// import { routes } from "./router"; //路由規則
// Vue.use(PortalVue);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.prototype.$PortalVue = PortalVue;
Vue.use(BootstrapVue);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
router.beforeEach((to, from, next) => {
  const isLogin = $cookies.get("token") == "ImLogin";
  console.log(isLogin);
  if (isLogin) {
    console.log(isLogin + "!!!");
    next();
  } else {
    if (to.path !== "/home") next("/home");
    else next();
  }
});
