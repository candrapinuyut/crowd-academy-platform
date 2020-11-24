export default [
  {
    name: 'dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    active: false,
    role: [0, 1],
    icon:'fa fa-home',
  },
  {
    name: 'kelas',
    title: 'Semua Kelas',
    to: '/kelas/semua-kelas',
    active: false,
    role: [0, 1],
    icon:'fa fa-home',
  },
  {
    name: 'artikel',
    title: 'Artikel',
    to: '/artikel',
    active: false,
    role: [0, 1],
    icon:'fa fa-star',
  },
  {
  name: 'Kelas',
  title: 'Kelas Saya',
  active: false,
  icon:'fa fa-inbox',
  role: [0],
  menus:[
    {
      name: 'kelas.follow',
      title: 'di ikuti',
      to: '/kelas/follow',
      active: false,
      role: [0],
    },
    {
      name: 'kelas.done',
      title: 'Selesai',
      to: '/kelas/done',
      active: false,
      role: [0],
    },

  ]
  },
  {
    name: 'kelassaya',
    title: 'Kelas Saya',
    to: '/kelas/list',
    active: false,
    role: [1],
    icon:'fa fa-file',
  },
  {
    name: 'manajemen-artikel',
    title: 'Artikel Saya',
    to: '/manajemen-artikel',
    active: false,
    role: [0, 1],
    icon:'fa fa-print',
  },


];
