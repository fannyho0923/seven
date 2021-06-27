import Vue from "vue";
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

// 常呼叫的api
//上傳圖片(所有要上傳圖片的都要先打這支在將回傳的網址拿來做顯示)
export const setImg = file => {
  return req("post", "/Image/", file);
};

//查看看板
// boardType: 1- 公共留言 V-v
export const getPublicArticle = userSeriel => {
  return req("get", `/Board/${userSeriel}/1/`, -1);
};
// boardType: 2- 公共影音 V-v
export const getVedio = userSeriel => {
  return req("get", `/Board/${userSeriel}/2/`, -1);
};
// boardType: 3-私人看板 V-v
export const getPrivateArticle = (userSeriel, doorIndex) => {
  return req("get", `/Board/${userSeriel}/3/`, doorIndex);
};

//新增看板發文
// boardType: 1- 公共留言 V-v
export const addPublicArticle = data => {
  return req("post", "/Board/", data);
};
// boardType: 2- 公共影音 V-v
export const addVedio = data => {
  return req("post", "/Board/", data);
};
// boardType: 3-私人看板 V-v
export const addPrivateArticle = data => {
  return req("post", "/Board/", data);
};

//刪除發文
// boardType: 1- 公共留言 V-v
export const deletePublicArticle = postSeriel => {
  return req("patch", `/Board/Delete/${postSeriel}/`);
};
// boardType: 2- 公共影音 V-v
export const deleteVedio = postSeriel => {
  return req("patch", `/Board/Delete/${postSeriel}/`);
};
// boardType: 3-私人看板 V-v
export const deletePrivateArticle = postSeriel => {
  return req("patch", `/Board/Delete/${postSeriel}/`);
};

// User 相關的 api

//註冊帳號Ｖ-v
export const userSignUp = signUpData => {
  return req("post", "/SignUp/", signUpData);
};
//登入帳號Ｖ-v
export const userLogIn = loginData => {
  return req("post", "/SignIn/", loginData);
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
//搬到新的社群V-v
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

//取得社群成員資料 V-v
export const getMembers = userSeriel => {
  return req("get", "/Group/Members/" + userSeriel);
};
//取得玩家資料 V-v
export const getUserInfo = userSeriel => {
  return req("get", "/Group/Role/" + userSeriel);
};
//=====================================================

// Room 相關的 api

//進入社群中的玩家空間 V-v
export const getRoomInfo = (doorIndex, userSeriel) => {
  return req("get", `/Group/${doorIndex}/${userSeriel}/`);
};

// 日記相關的 api
// 有日記的日期（用來highlight）V-v
export const getDiaryHighlight = userSeriel => {
  return req("get", "/Diary/WritenDays/" + userSeriel);
};
// 查看指定日期日記 V-v
export const getDiaryContent = (userSeriel, id) => {
  return req("get", `/Diary/${userSeriel}`, id);
};
// 新增修改日記內容 V-v
export const setDiaryTxt = txt => {
  return req("post", "/Diary/txt/", txt);
};
// 新增修改日記圖片 V-v
export const setDiaryImg = img => {
  return req("post", "/Diary/img/", img);
};

// 文章相關的 api
//查看留言 V-v
export const getComment = (postSeriel, userSeriel) => {
  return req("get", `/Comment/${postSeriel}/${userSeriel}`);
};
//新增留言 V-v
export const addComment = data => {
  return req("post", "/Comment/", data);
};
//刪除留言 V-v
export const deleteComment = commentSeriel => {
  return req("patch", `/Comment/Delete/${commentSeriel}`);
};

// 聊天室相關的api
// 取得聊天室清單 V-v
export const getChatList = userSeriel => {
  return req("get", `/Chat/Members/${userSeriel}`);
};
// 傳送訊息 V-v
export const sentChat = data => {
  return req("post", "/Chat/", data);
};
// 對話訊息 V-v
export const getChat = (userSeriel, parterUserSeriel) => {
  return req("get", `/Chat/${userSeriel}/${parterUserSeriel}`);
};

// 房間牆上相簿相關的api
// 修改牆上照片
export const setPhoto = data => {
  return req("patch", "/Private/Photo/", data);
};
//刪除牆上照片
export const deletePhoto = (photoIndex, userSeriel) => {
  return req("delete", `/Private/Photo/${photoIndex}/${userSeriel}`);
};
// 搜尋相關的 api
export const apiSearch = data =>
  searchRequest.get(`/Search?searchdata=${data}`);
export const apiSearchType = () => searchRequest.get(`/SearchType`);
