import Axios from 'axios';

const { REACT_APP_API_URL } = process.env;


export default {
  default: {
    client: Axios.create({
      baseURL: REACT_APP_API_URL,
      responseType: 'json',
    }),
    options: {
      interceptors: {
        request: [
          // eslint-disable-next-line no-unused-vars
          ({ getState }, req) => {
            req.headers.Accept = 'application/json';
            return req;
          },
        ],
      },
    },
  },
  pelajar: {
    client: Axios.create({
      baseURL: `${REACT_APP_API_URL}`,
      responseType: 'json',
    }),
    options: {
      interceptors: {
        request: [
          // eslint-disable-next-line no-unused-vars
          ({ getState, dispatch, getSourceAction }, req) => {
            req.headers.Accept = 'application/json';
            if (
              getState() &&
              getState().app &&
              getState().app.authorization &&
              getState().app.authorization.token
            ) {
              req.headers[
                'auth-token'
              ] = getState().app.authorization.token;
            }
            return req;
          },
        ],
      },
    },
  },
  pengajar: {
    client: Axios.create({
      baseURL: `${REACT_APP_API_URL}`,
      responseType: 'json',
    }),
    options: {
      interceptors: {
        request: [
          // eslint-disable-next-line no-unused-vars
          ({ getState, dispatch, getSourceAction }, req) => {
            req.headers.Accept = 'application/json';
            if (
              getState() &&
              getState().app &&
              getState().app.authorization &&
              getState().app.authorization.token
            ) {
              req.headers[
                'auth-token'
              ] = getState().app.authorization.token;
            }
            return req;
          },
        ],
      },
    },
  },
  admin: {
    client: Axios.create({
      baseURL: `${REACT_APP_API_URL}`,
      responseType: 'json',
    }),
    options: {
      interceptors: {
        request: [
          // eslint-disable-next-line no-unused-vars
          ({ getState, dispatch, getSourceAction }, req) => {
            req.headers.Accept = 'application/json';
            if (
              getState() &&
              getState().app &&
              getState().app.authorization &&
              getState().app.authorization.token
            ) {
              req.headers[
                'auth-token'
              ] = getState().app.authorization.token;
            }
            return req;
          },
        ],
      },
    },
  },
  upload: {
    client: Axios.create({
      baseURL: `${REACT_APP_API_URL}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'json',
    }),
    options: {
      interceptors: {
        request: [
          // eslint-disable-next-line no-unused-vars
          ({ getState, dispatch, getSourceAction }, req) => {
            req.headers.Accept = 'application/json';
            if (
              getState() &&
              getState().app &&
              getState().app.authorization &&
              getState().app.authorization.token
            ) {
              req.headers[
                'auth-token'
              ] =getState().app.authorization.token;
            }
            return req;
          },
        ],
      },
    },
  }

};
