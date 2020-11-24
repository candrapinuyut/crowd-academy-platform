import { GET_PROFILE,UPDATE_PROFILE } from './constants';

const init = {
  loading: {},
  selected: {},
  list: {
    count: 0,
    offset: 0,
    rows: [],
    limit: 10,
  },
  error: {},
};

export default (state = init, action) => {
  const { type, error, payload } = action;

  switch (type) {
    case `${GET_PROFILE}_FAIL`:
    case `${GET_PROFILE}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [GET_PROFILE]: false,
          error: {
            ...state.error,
            [GET_PROFILE]: error || null,
          },
        },
    };

    case `${UPDATE_PROFILE}_FAIL`:
    case `${UPDATE_PROFILE}_SUCCESS`:
      return {
        ...state,
        loading: {
          ...state.loading,
          [UPDATE_PROFILE]: false,
          error: {
            ...state.error,
            [UPDATE_PROFILE]: error || null,
          },
        },
    };

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
