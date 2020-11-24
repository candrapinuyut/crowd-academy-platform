import {
  UPLOAD,
  GET_KELAS,
  SHOW_KELAS,
  UPDATE_KELAS_DONE,
  REGISTER_KELAS,
  GET_KELAS_DONE,
  GET_KELAS_FOLLOW,
  GET_DONE_FOLLOW,
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
          [UPLOAD_IMAGE]: false,
          error: {
            ...state.error,
            [UPLOAD_IMAGE]: error || null,
          },
        },
    };
    case `${SHOW_KELAS}_FAIL`:
    case `${SHOW_KELAS}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [SHOW_KELAS]: false,
        },
        selected: {
          ...(payload &&
          payload.data && {
            ...payload.data,
          }),
        },
        error: {
          ...state.error,
          [SHOW_KELAS]: error || null,
        },
    };
    case `${SHOW_ENROL}_FAIL`:
    case `${SHOW_ENROL}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [SHOW_ENROL]: false,
        },
        selected: {
          ...(payload &&
          payload.data && {
            ...payload.data,
          }),
        },
        error: {
          ...state.error,
          [SHOW_ENROL]: error || null,
        },
    };
    case `${REGISTER_KELAS}_FAIL`:
    case `${REGISTER_KELAS}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [REGISTER_KELAS]: false,
        },
        selected: {
          ...(payload &&
          payload.data && {
            ...payload.data,
          }),
        },
        error: {
          ...state.error,
          [REGISTER_KELAS]: error || null,
        },
    };
    case `${UPDATE_KELAS_DONE}_FAIL`:
    case `${UPDATE_KELAS_DONE}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [UPDATE_KELAS_DONE]: false,
        },
        selected: {
          ...(payload &&
          payload.data && {
            ...payload.data,
          }),
        },
        error: {
          ...state.error,
          [UPDATE_KELAS_DONE]: error || null,
        },
    };

    case `${GET_KELAS}_SUCCESS`:
    case `${GET_KELAS}_FAIL`: {
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
          [GET_KELAS]:false,
        },
        error: {
          ...state.error,
          [GET_KELAS]: error || null,
        },
      };
    }

    case `${GET_KELAS_FOLLOW}_SUCCESS`:
    case `${GET_KELAS_FOLLOW}_FAIL`: {
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
          [GET_KELAS_FOLLOW]:false,
        },
        error: {
          ...state.error,
          [GET_KELAS_FOLLOW]: error || null,
        },
      };
    }
    case `${GET_DONE_FOLLOW}_SUCCESS`:
    case `${GET_DONE_FOLLOW}_FAIL`: {
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
          [GET_DONE_FOLLOW]:false,
        },
        error: {
          ...state.error,
          [GET_DONE_FOLLOW]: error || null,
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
