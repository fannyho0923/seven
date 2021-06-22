import req from "./api";

//使用方式
// import { userLogIn } from "@/js/all.js";

// userLogIn("mike@gmail.com",{
//   pw: "123456789",
//   userName:""
//   })
//   .then(res => {
//     console.log(res));
//   })
//   .catch(error => {
//     console.log(err);//response攔截器會先執行，除非你漏接了，才會進到catch
//   })

// User 相關的 api

//註冊帳號Ｖ-v
export const userSignUp = signUpData => {
  return req("post", "/SignUp", signUpData);
};
//登入帳號Ｖ-v
export const userLogIn = loginData => {
  return req("post", "/SignIn", loginData);
};
//使用者社群狀態V-v (-1-未加入 2-已到期 1-正常)
export const userStatus = userSeriel => {
  return req("get", "/Group/Status/" + userSeriel);
};
// (-1-未加入 ２-已到期 1-正常)
//新社群(-1)V-v
export const userAddNewGroup = userSeriel => {
  return req("get", "/Group/New/" + userSeriel);
};
//搬家(2)
//搬到新的社群
export const userTransferGroup = userSeriel => {
  return req("get", "/Group/Transfer/" + userSeriel);
};
//修改密碼/暱稱x
// export const userLogin = userData => {
//   return req("put", "/User", userData);
// };
//查詢帳號/密碼x
// export const userLogin = userData => {
//   return req("get", "/", userData);
// };
// export const userLogOut = () => {
//   return req("get", "/user/log-out");
// };
// export const userDelete = userNo => {
//   return req("delete", "/user/delete", userNo);
// };

//=====================================================

// Group 相關的 api

//取得社群成員資料
export const getMembers = userSeriel => {
  return req("get", "/Group/Members/" + userSeriel);
};

//=====================================================

// Room 相關的 api

//進入社群中的玩家空間v
export const enterRoom = (doorIndex, userSeriel) => {
  return req("get", "/Group/" + doorIndex + "/" + userSeriel);
};

// 文章相關的 api
//新增看板發文v
export const postArticle = data => {
  return req("post", "/Board", data);
};
//查看看板v
export const watchArticle = data => {
  return req("get", "/Board", data);
};

// 搜尋相關的 api
export const apiSearch = data =>
  searchRequest.get(`/Search?searchdata=${data}`);
export const apiSearchType = () => searchRequest.get(`/SearchType`);
