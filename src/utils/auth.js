import axios from "axios";

//获取token，用来渲染用户信息
export function getToken() {
  return localStorage.getItem("token")
}

//设置token，登陆时调用
export function setToken(token) {               //account是用户id
  const usertoken = {
    token:token,
    // expire: new Date().getTime() + 1000 * 60 * 60       //60分钟有效期
  };
  localStorage.setItem("token", JSON.stringify(usertoken))
  console.log(localStorage.getItem('token'))
}