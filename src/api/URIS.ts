import configs from '../configs';

export const BASE_URL = configs.BASE_URL;

const URIS = {
  REGISTER_USER: `${BASE_URL}/register`,
  LOGIN_USER: `${BASE_URL}/login`,

  USER_PROFILE: `${BASE_URL}/users/profile`,
};

export default URIS;
