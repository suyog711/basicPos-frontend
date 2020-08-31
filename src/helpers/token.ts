const checkToken = () => {
  return localStorage.getItem('TOKEN_KEY') != null;
};

const removeToken = () => {
  return localStorage.removeItem('TOKEN_KEY');
};

const setToken = (payload: string) => {
  return localStorage.setItem('TOKEN_KEY', payload);
};

const getToken = () => {
  return localStorage.getItem('TOKEN_KEY');
};

export default {
  checkToken,
  removeToken,
  setToken,
  getToken,
};
