/*
 * @Author: wangtengteng
 * @Date: 2020-12-05 10:47:07
 * @LastEditTime: 2020-12-05 10:49:20
 * @FillPath: Do not edit
 */
import $http from '@/config/http';
import querystring from 'querystring';
import { Message } from 'element-ui';
import axios from 'axios';

export const getRequirementListMoudle = (params) => {
  let requestUrl = '/requirement-list';
  return $http.post(requestUrl, params)
}
