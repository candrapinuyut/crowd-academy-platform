import {
  UPLOAD,
  GET_KELAS,UPDATE_KELAS_DONE,GET_KELAS_DONE,GET_KELAS_FOLLOW,SHOW_ENROL,REGISTER_KELAS,SHOW_KELAS} from './constants';

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

export const getKelas = (params = {}) => ({
  type: GET_KELAS,
  payload: {
    client: 'pelajar',
    request: {
      url: '/kelas/list',
      params,
    },
  },
});

export const getPengajarKelas = (params = {}) => ({
  type: GET_KELAS,
  payload: {
    client: 'pengajar',
    request: {
      url: '/kelas/kelas-saya',
      params,
    },
  },
});
export const deleteKelas = (id) => ({
  type: GET_KELAS,
  payload: {
    client: 'pengajar',
    request: {
      url: '/kelas/delete/'+id,
      method:'delete',
    },
  },
});
export const getKelasFollow = (params = {}) => ({
  type: GET_KELAS_FOLLOW,
  payload: {
    client: 'pelajar',
    request: {
      url: '/pelajar/follow',
      params,
    },
  },
});
export const getKelasDone = (params = {}) => ({
  type: GET_KELAS_DONE,
  payload: {
    client: 'pelajar',
    request: {
      url: '/pelajar/done',
      params,
    },
  },
});
export const showKelas = (id, params = {}) => ({
  type: SHOW_KELAS,
  payload: {
    client: 'pelajar',
    request: {
      url: `/kelas/show/${id}`,
      params,
    },
  },
});
export const showKelasEnrol= (id, params = {}) => ({
  type: SHOW_KELAS,
  payload: {
    client: 'pelajar',
    request: {
      url: `/kelas/showKelasEnrol/${id}`,
      params,
    },
  },
});
export const showEnrol = (id, params = {}) => ({
  type: SHOW_ENROL,
  payload: {
    client: 'pelajar',
    request: {
      url: `/kelas/enrol/${id}`,
      params,
    },
  },
});
export const registerKelas = (data = {}) => ({
  type: REGISTER_KELAS,
  payload: {
    client: 'pelajar',
    request: {
      url: `/pelajar/kelas/register`,
      method: 'post',
      data,
    },
  },
});
export const storeKelas = (data = {}) => ({
  type: REGISTER_KELAS,
  payload: {
    client: 'pengajar',
    request: {
      url: `/kelas/store`,
      method: 'post',
      data,
    },
  },
});
export const doneKelas = (data = {}) => ({
  type: REGISTER_KELAS,
  payload: {
    client: 'pelajar',
    request: {
      url: `/pelajar/kelas/done`,
      method: 'put',
      data,
    },
  },
});

export const setModal = ( status )=>({
  type:'MODAL_SHOW',
  status:status,
})


export default {
  uploadImage,
  getKelas,
  getPengajarKelas,
  registerKelas,
  doneKelas,
  getKelasFollow,
  getKelasDone,
  showKelas,
  showKelasEnrol,
  showEnrol,
  deleteKelas,
  setModal,
  storeKelas,
 };
