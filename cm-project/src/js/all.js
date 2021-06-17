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

//註冊帳號v
export const userSignUp = signUpData => {
  return req("post", "/SignUp", signUpData);
};
//登入帳號v
export const userLogIn = loginData => {
  return req("post", "/SignIn", loginData);
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

// Group 相關的 api
//查詢社群x
export const queryGroup = groupData => {
  return req("get", "/Group", groupData);
};
//加入社群v
export const joinGroup = groupData => {
  return req("post", "/Group", groupData);
};
//進入社群空間v
export const enterGroup = groupData => {
  return req("get", "/Group", groupData);
};
//退出社群x
//進入社群中的玩家空間v
export const leaveGroup = roomData => {
  return req("get", "/Group", roomData);
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
