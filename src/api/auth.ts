import axios from 'axios';
import URIS from './URIS';

export const registerUser = (payload: Pick<IUser, 'username' | 'password' | 'email'>) => axios.post(URIS.REGISTER_USER, payload);
export const loginUser = (payload: Pick<IUser, 'username' | 'password'>) => axios.post(URIS.LOGIN_USER, payload);
