/*
 * @Author: wangtengteng
 * @Date: 2020-12-10 19:18:22
 * @LastEditTime: 2020-12-10 19:19:01
 * @FilePath: \cuohe-manage\src\api\requirement.js
 */
import $http from '@/config/http';

export const requirementListMoudle = (params) => {
  let requestUrl = '/official/mgr/api/requirement-list';
  return $http.post(requestUrl, params)
}
