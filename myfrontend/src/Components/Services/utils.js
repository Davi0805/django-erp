import Cookies from 'js-cookie';

const setToken = (token) => {
  Cookies.set('token', token, {
    expires: 1, // expira em 1 dia
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
};

const setRefreshToken = (refreshtoken) => {
  Cookies.set('refresh', refreshtoken, {
    expires: 1, // expira em 1 dia
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
};

const getToken = () => {
  return Cookies.get('token');
};

export { setToken, getToken, setRefreshToken };