/*
 * @Author: wangtengteng
 * @Date: 2020-12-11 17:31:51
 * @LastEditTime: 2020-12-16 20:02:21
 * @FilePath: \cuohe-manage\src\api\systemAccount.js
 */
import $http from '@/config/http';

// 历史记录列表
export const operateListMoudle = (params) => {
  let requestUrl = '/official/mgr/api/operate-list';
  return $http.post(requestUrl, params)
}

// 用户列表
export const userListMoudle = (params) => {
  let requestUrl = '/official/mgr/api/user-list';
  return $http.post(requestUrl, params)
}
// 管理员删除子账号
export const deleteManageUserMoudle = (params) => {
  let requestUrl = '/official/mgr/api/delete-user';
  return $http.post(requestUrl, params)
}

// 审批用户
export const userInfoUpdateMoudle = (params) => {
  let requestUrl = '/official/mgr/api/user-info-update';
  return $http.post(requestUrl, params)
}

//通过邀请码查看邀请人信息
export const getUserInfoFromInviteCodeMoudle = (params) => {
  let requestUrl = '/official/mgr/api/get-user-info-from-invite-code';
  return $http.post(requestUrl, params)
}

//管理员列表
export const managerListMoudle = (params) => {
  let requestUrl = '/official/mgr/api/manager-list';
  return $http.post(requestUrl, params)
}

//删除管理员账号
export const deleteUserMoudle = (params) => {
  let requestUrl = '/official/mgr/api/delete-user';
  return $http.post(requestUrl, params)
}

//创建管理员账号
export const createUserMoudle = (params) => {
  let requestUrl = '/official/mgr/api/create-user';
  return $http.post(requestUrl, params)
}

//通过id查询用户信息
export const getUserByIdMoudle = (params) => {
  let requestUrl = '/official/mgr/api/get-user-info-by-id';
  return $http.post(requestUrl, params)
}

