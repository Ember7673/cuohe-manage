/*
 * @Author: wangtengteng
 * @Date: 2020-12-05 10:47:07
 * @LastEditTime: 2020-12-10 18:09:47
 * @FillPath: Do not edit
 */
import $http from '@/config/http';

export const manageLoginMoudle = (params) => {
  let requestUrl = '/official/api/login-with-password';
  return $http.post(requestUrl, params)
}
//给超级管理员账号发送登录验证码
export const sendcodeMoudle = (params) => {
  let requestUrl = '/official/mgr/api/mb/sendcode';
  return $http.post(requestUrl, params)
}
//三十七．超级管理员账号-验证码-密码登录
export const superManageLoginMoudle = (params) => {
  let requestUrl = '/official/api/login-with-valid_num';
  return $http.post(requestUrl, params)
}

// 登出
export const logoutMoudle = (params) => {
  let requestUrl = '/official/api/logout';
  return $http.post(requestUrl, params)
}
