import {
  UPLOAD,
  GET_ARTIKEL,
  UPDATE_ARTIKEL,
  STORE_ARTIKEL,
  SHOW_ARTIKEL
} from './constants';

const init = {
  loading: {},
  selected: {},
  list: {
    count: 0,
    offset: 0,
    rows: [],
    limit: 10,
  },
  modalShow:false,
  error: {},
};

export default (state = init, action) => {
  const { type, error, payload,status } = action;

  switch (type) {
    case 'MODAL_SHOW':
    return{
      ...state,
      modalShow:status,
    }
    break;
    case `${UPLOAD}_FAIL`:
    case `${UPLOAD}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [UPLOAD]: false,
          error: {
            ...state.error,
           [UPLOAD]: error || null,
          },
        },
    };
    case `${SHOW_ARTIKEL}_FAIL`:
    case `${SHOW_ARTIKEL}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [SHOW_ARTIKEL]: false,
        },
        selected: {
          ...(payload &&
          payload.data && {
            ...payload.data,
          }),
        },
        error: {
          ...state.error,
          [SHOW_ARTIKEL]: error || null,
        },
    };
    case `${STORE_ARTIKEL}_FAIL`:
    case `${STORE_ARTIKEL}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [STORE_ARTIKEL]: false,
        },
        selected: {
          ...(payload &&
          payload.data && {
            ...payload.data,
          }),
        },
        error: {
          ...state.error,
          [STORE_ARTIKEL]: error || null,
        },
    };
    case `${UPDATE_ARTIKEL}_FAIL`:
    case `${UPDATE_ARTIKEL}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [UPDATE_ARTIKEL]: false,
        },
        selected: {
          ...(payload &&
          payload.data && {
            ...payload.data,
          }),
        },
        error: {
          ...state.error,
          [UPDATE_ARTIKEL]: error || null,
        },
    };

    case `${GET_ARTIKEL}_SUCCESS`:
    case `${GET_ARTIKEL}_FAIL`: {
      return {
        ...state,
        ...(payload &&
          payload.data &&
          payload.config.params.status && {
          [payload.config.params.status]: {
            ...state[payload.config.params.status],
            offset: payload.config.params.offset || 0,
            ...payload.data,
          },
        }),
        loading: {
          ...state.loading,
          [GET_ARTIKEL]:false,
        },
        error: {
          ...state.error,
          [GET_ARTIKEL]: error || null,
        },
      };
    }
    default:
      return {
        ...state,
        loading: {
          ...state.loading,
          [type]: true,
        },
      };
  }
};
