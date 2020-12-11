/*
 * @Author: wangtengteng
 * @Date: 2020-12-10 19:18:22
 * @LastEditTime: 2020-12-11 16:55:04
 * @FilePath: \cuohe-manage\src\api\requirement.js
 */
import $http from '@/config/http';

// 需求列表
export const requirementListMoudle = (params) => {
  let requestUrl = '/official/mgr/api/requirement-list';
  return $http.post(requestUrl, params)
}
// 更新需求
export const requirementInfoUpdateMoudle = (params) => {
  let requestUrl = '/official/mgr/api/requirement-info-update';
  return $http.post(requestUrl, params)
}

// 资源列表
export const resourceListMoudle = (params) => {
  let requestUrl = '/official/mgr/api/resource-list';
  return $http.post(requestUrl, params)
}
// 更新资源
export const resourceInfoUpdateMoudle = (params) => {
  let requestUrl = '/official/mgr/api/resource-info-update';
  return $http.post(requestUrl, params)
}