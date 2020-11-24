import {
  UPLOAD,
  GET_ARTIKEL,
  UPDATE_ARTIKEL,
  STORE_ARTIKEL,
  SHOW_ARTIKEL
} from './constants';

  export const uploadImage = (data = {}) => ({
    type: UPLOAD,
    payload: {
      client: 'upload',
      request: {
        url: `/upload/file`,
        method: 'post',
        data,
      },
    },
  });

export const getArtikel = (params = {}) => ({
  type: GET_ARTIKEL,
  payload: {
    client: 'pelajar',
    request: {
      url: '/artikel/list',
      params,
    },
  },
});
export const getMyArtikel = (params = {}) => ({
  type: GET_ARTIKEL,
  payload: {
    client: 'pelajar',
    request: {
      url: '/artikel/list/me',
      params,
    },
  },
});

export const deleteArtikel = (id) => ({
  type: GET_ARTIKEL,
  payload: {
    client: 'pengajar',
    request: {
      url: '/artikel/delete/'+id,
      method:'delete',
    },
  },
});
export const showArtikel = (id, params = {}) => ({
  type: SHOW_ARTIKEL,
  payload: {
    client: 'pelajar',
    request: {
      url: `/artikel/show/${id}`,
      params,
    },
  },
});

export const storeArtikel = (data = {}) => ({
  type: STORE_ARTIKEL,
  payload: {
    client: 'pengajar',
    request: {
      url: `/artikel/store`,
      method: 'post',
      data,
    },
  },
});
export const updateArtikel = (id,data = {}) => ({
  type: UPDATE_ARTIKEL,
  payload: {
    client: 'pengajar',
    request: {
      url: `/artikel/update/${id}`,
      method: 'put',
      data,
    },
  },
});


export default {
  uploadImage,
  getArtikel,
  getMyArtikel,
  storeArtikel,
  showArtikel,
  deleteArtikel,
  storeArtikel,
 };
