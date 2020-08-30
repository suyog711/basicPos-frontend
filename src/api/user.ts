import axios from 'axios';
import URIS from './URIS';
import token from 'helpers/token';

const instance = axios.create({
  headers: { authorization: token.getToken() },
});

export const getUserProfile = (payload: any = {}) => instance.get(URIS.USER_PROFILE, payload);

export const updateUserProfile = (payload: FormData) => instance.put(URIS.USER_PROFILE, payload);
