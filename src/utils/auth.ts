import Cookies from 'js-cookie';

const tokenKey = 'User-Token';

export function getToken() {
    return Cookies.get(tokenKey);
}

export function setToken(token: string) {
  return Cookies.set(tokenKey, token);
}
