import {
  GET_TOKEN,
  GET_ME,
  LOGOUT,
  SET_TITLE,
  SET_ROLE,
  REGISTER,
} from './constants';

/**
 * Action to get token
 * @param {username and password} data
 */
export const getToken = (data) => ({
  type: GET_TOKEN,
  role: 1,
  payload: {
    client: 'default',
    request: {
      url: '/pelajar/login',
      method: 'post',
      data,
    },
  },
});
export const registerPelajar = (data) => ({
  type: REGISTER,
  role: 1,
  payload: {
    client: 'default',
    request: {
      url: '/pelajar/register',
      method: 'post',
      data,
    },
  },
});
export const registerPengajar = (data) => ({
  type: REGISTER,
  role: 1,
  payload: {
    client: 'default',
    request: {
      url: '/Pengajar/register',
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
    role: 1,
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


export const setRole = (role) => ({
  type: SET_ROLE,
  role,
});

export default {
  getToken,
  registerPelajar,
  registerPengajar,
  getMe,
  getOut,
  setRole,
};
