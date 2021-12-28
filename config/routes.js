export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        redirect: '/info',
      },
      {
        path: '/login',
        redirect: '/user/login',
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/info',
                name: '我的信息',
                icon: 'user',
                component: './Info',
                authority: ['user', 'admin'],
              },
              {
                path: '/square',
                name: '劳驾广场',
                icon: 'AppstoreOutlined',
                component: './Square',
                authority: ['user', 'admin'],
              },
              {
                path: '/request',
                name: '我的劳驾',
                icon: 'EditOutlined',
                component: './MyRequest',
                authority: ['user'],
              },
              {
                path: '/response',
                name: '我的接驾',
                icon: 'HeartOutlined',
                component: './MyResponse',
                authority: ['user'],
              },
              {
                path: '/user_list',
                name: '用户列表',
                icon: 'UnorderedListOutlined',
                component: './UserList',
                authority: ['admin'],
              },
              {
                path: '/statistics',
                name: '统计报表',
                icon: 'pie-chart',
                component: './Statistics',
                authority: ['admin'],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
