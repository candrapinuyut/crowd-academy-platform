import { GET_PROFILE,UPDATE_PROFILE,UPDATE_PASSWORD } from './constants';

export const getProfile = (params = {}) => ({
  type: GET_PROFILE,
  payload: {
    client: 'default',
    request: {
      url: '/account/me',
      params,
    },
  },
});

export const updateProfile = (data = {}) => ({
  type: UPDATE_PROFILE,
  payload: {
    client: 'default',
    request: {
      url: `update-profile`,
      method:'post',
      data,
    },
  },
});
export const updatePassword = (data = {}) => ({
  type: UPDATE_PASSWORD,
  payload: {
    client: 'default',
    request: {
      url: `change-password`,
      method:'post',
      data,
    },
  },
});

export default {
  getProfile,
  updateProfile,
};
