import { ChromeFilled, SmileFilled } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        name: '首页',
        icon: <SmileFilled />,
        component: './page',
      },
      {
        path: '/blog',
        name: 'blog',
        icon: <SmileFilled />,
        component: './blog',
      },
      {
        path: 'https://ant.design',
        name: 'Ant Design 官网外链',
        icon: <ChromeFilled />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
  appList: [],
};
