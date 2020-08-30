import URIS from './URIS';
import instance from './instance';

export const getUserProfile = (payload: any = {}) => instance().get(URIS.USER_PROFILE, payload);

export const updateUserProfile = (payload: FormData) => instance().put(URIS.USER_PROFILE, payload);
