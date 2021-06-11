import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import UserInfo from "@/views/UserInfo.vue";
import Header from "@/views/Header.vue";
import Blog from "@/views/Blog.vue";
import Test from "@/views/Test.vue";
import PublicArea from "@/views/PublicArea.vue";
import Refrigerator from "@/views/Refrigerator.vue";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Home",
      components: {
        default: Home, //，沒指定的會 fallback 至 default。
        nav: Header //key名將會自動匹配到指定 name 的 router-view
      }
    },
    {
      path: "/userInfo",
      name: "UserInfo",
      component: UserInfo
    },
    {
      path: "/header",
      name: "nav",
      component: Header
    },
    {
      path: "/blog",
      name: "Blog",
      component: Blog
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: "/publicArea",
      name: "PublicArea",
      component: PublicArea
    },
    {
      path: "/refrigerator",
      name: "Refrigerator",
      component: Refrigerator
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
// export default router;
