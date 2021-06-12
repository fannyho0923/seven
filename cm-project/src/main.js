// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import App from "./App";
import PortalVue from "portal-vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// import { routes } from "./router"; //路由規則
// Vue.use(PortalVue);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.prototype.$PortalVue = PortalVue;
Vue.use(BootstrapVue);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
