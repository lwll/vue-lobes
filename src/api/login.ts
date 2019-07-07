import request from '../utils/request';

export function login(loginParam: {username: string, password: string}) {
  const username = loginParam.username;
  const password = loginParam.password;
  return request({
      url: '/oauth/token',
      method: 'get',
      params: {
        username,
        password,
      }
    });
}

export function getUserInfo() {
  return request({
    url: 'user',
    method: 'get'
  });
}
