import request from '@/request';

export const getUserInfo = (params: any) => {
  return request({
    url: '/api/user/info',
    method: 'post',
    params,
  });
};
export const login = (data: any) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  });
};
