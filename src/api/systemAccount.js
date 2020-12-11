/*
 * @Author: wangtengteng
 * @Date: 2020-12-11 17:31:51
 * @LastEditTime: 2020-12-11 18:35:54
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
export const deleteUserMoudle = (params) => {
  let requestUrl = '/official/mgr/api/delete-user';
  return $http.post(requestUrl, params)
}






