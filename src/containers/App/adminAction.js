import {
  GET_TOKEN,
  GET_TOKEN_ADMIN,
  GET_ME,
  LOGOUT,
  SET_TITLE,
  GET_DELIVERY_OPTIONS,
} from './constants';

/**
 * Action to get token
 * @param {username and password} data
 */
export const getToken = (data) => ({
  type: GET_TOKEN_ADMIN,
  payload: {
    client: 'default',
    request: {
      url: '/pengajar/login',
      method: 'post',
      data,
    },
  },
});

/**
 * Get profile data
 */
export const getMe = () => ({
  type: GET_ME,
  payload: {
    client: 'default',
    request: {
      url: '/account/me',
      method: 'get',
    },
  },
});

export const getOut = () => ({
  type: LOGOUT,
});

export const setTitle = (title) => ({
  type: SET_TITLE,
  title,
});



export default {
  getToken,
  getMe,
  getOut,
 };
