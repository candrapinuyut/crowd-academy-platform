import {
  GET_TOKEN,
  GET_TOKEN_ADMIN,
  GET_ME,
  LOGOUT,
  SET_TITLE,
  GET_DELIVERY_OPTIONS,
  SET_ROLE,
  REGISTER,
} from './constants';
import menus from './menus';

const init = {
  loading: {},
  isAuthenticated: false,
  authorization: null,
  role: 0,
  error: {},
  me: {},
  title: '',
  menus,
  delivery_options: [],
};

export default (state = init, action) => {
  //localStorage.removeItem('AUTHORIZATION');

  const { type, role, error, payload, title } = action;
  const stored = localStorage.getItem('AUTHORIZATION');
  const authorization = (stored && JSON.parse(stored)) || null;

  let additional = {};


  if (authorization) {
    // check if has authorization in local storage
    const role = localStorage.getItem('role');
    additional = {
      role: role || 0,
      authorization,
      isAuthenticated: true,
    };
  }

  switch (type) {
    case SET_ROLE:
      return {
        ...state,
        role: role || 0,
      };
    case SET_TITLE:
      return {
        ...state,
        title,
      };
    case LOGOUT:
      localStorage.removeItem('AUTHORIZATION');
      return {
        ...state,
        isAuthenticated: false,
        authorization: null,
        me: {},
      };

    case `${GET_ME}_SUCCESS`:
    case `${GET_ME}_FAIL`: {
      let updated = {};
      if (payload && payload.data) {

        updated = {
          me: payload.data.data,
        };
      }else   console.log('gagal anjing')

      return {
        ...state,
        ...updated,
        loading: {
          ...state.loading,
          [GET_ME]: false,
        },
        error: {
          ...state.error,
          [GET_ME]: error || null,
        },
      };
    }
    case `${REGISTER}_SUCCESS`:
    case `${REGISTER}_FAIL`: {
      let updated = {};
      if (payload && payload.data) {

        updated = {
          me: payload.data.data,
        };
      }else   console.log('gagal anjing')

      return {
        ...state,
        ...updated,
        loading: {
          ...state.loading,
          [REGISTER]: false,
        },
        error: {
          ...state.error,
          [REGISTER]: error || null,
        },
      };
    }

    case `${GET_TOKEN_ADMIN}_SUCCESS`:
    case `${GET_TOKEN_ADMIN}_FAIL`: {
      let updated = {};
      if (payload && payload.data.data) {
        console.log('kuyy')
        localStorage.setItem('role', 1);
        updated = {
          ...updated,
          isAuthenticated: true,
          role: 1,
          authorization: payload.data.data.token,
        };

        localStorage.setItem(
          'AUTHORIZATION',
          JSON.stringify(payload.data.data, true),
        );
      }else console.log('kagak ada')

      return {
        ...state,
        ...updated,
        loading: {
          ...state.loading,
          [GET_TOKEN_ADMIN]: false,
        },
        error: {
          ...state.error,
          [GET_TOKEN_ADMIN]: error || null,
        },
      };
    }

    case `${GET_TOKEN}_SUCCESS`:
    case `${GET_TOKEN}_FAIL`: {
      let updated = {};

      if (payload && payload.data) {
        console.log('ambyar')
        localStorage.setItem('role', 0);
        updated = {
          ...updated,
          isAuthenticated: true,
          role: 0,
          authorization: payload.data.data,
        };

        localStorage.setItem(
          'AUTHORIZATION',
          JSON.stringify(payload.data.data, true),
        );
      }else console.log('gak ada')

      return {
        ...state,
        ...updated,
        loading: {
          ...state.loading,
          [GET_TOKEN]: false,
        },
        error: {
          ...state.error,
          [GET_TOKEN]: error || null,
        },
      };
    }
    default:
      return {
        ...state,
        ...additional,
        loading: {
          ...state.loading,
          [type]: true,
        },
      };
  }
};
