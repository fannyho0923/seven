import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

Vue.use(Vuex);
Vue.use(VueCookies);
// 定義一個新的 Vue Store
const store = new Vuex.Store({
  //state 有一點像是 component 的 data
  state: {
    // ex:
    // isLoading: false
    userSeriel: VueCookies.get("token")
  },
  //mutate 本身單字的意思是就是「變異」，人如其名就是拿來變動 state 用的。
  //mutations 要做更改，不可以變動在 State 還沒定義的 data
  mutations: {
    // 將state設定為參數
    // Loaded(state) {
    //   ex:state的isLoading true/false 互轉
    //   state.isLoading = !state.isLoading;
    // }
    Login(state, userSeriel) {
      state.userSeriel = userSeriel;
    }
  },
  getters: {
    userSeriel: state => {
      return state.userSeriel;
    }
  }
});
export default store;
