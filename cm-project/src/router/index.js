import Home from "@/views/Home.vue";
import Header from "@/views/Header.vue";
import PublicArea from "@/views/PublicArea.vue";
import Refrigerator from "@/views/Refrigerator.vue";
import Memo from "@/views/Memo.vue";
import Room from "@/views/Room.vue";
import Bookcase from "@/views/Bookcase.vue";
import Diary from "@/views/Diary.vue";
import Chat from "@/views/Chat.vue";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const original = Router.prototype.push;
Router.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err);
};
export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      components: {
        default: Home, //，沒指定的會 fallback 至 default。
        nav: Header //key名將會自動匹配到指定 name 的 router-view
      }
    },
    {
      path: "/header",
      name: "nav",
      component: Header
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
      path: "/memo",
      name: "Memo",
      component: Memo
    },
    {
      path: "/room",
      name: "Room",
      component: Room
    },
    {
      path: "/bookcase",
      name: "Bookcase",
      component: Bookcase
    },
    {
      path: "/diary",
      name: "Diary",
      component: Diary
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
// export default router;
