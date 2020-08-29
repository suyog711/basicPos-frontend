export const checkLogin = () => {
  return localStorage.getItem('TOKEN_KEY') != null;
};

export default checkLogin;
