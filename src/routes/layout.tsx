import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Outlet, useNavigate } from '@modern-js/runtime/router';
import { useState } from 'react';
import layoutMenu from './layoutMenu';

console.log('环境变量:', process.env);

export default () => {
  const navigate = useNavigate();

  const [pathname, setPathname] = useState('/');

  return (
    <ProLayout
      title={'Modern Demo'}
      siderWidth={220}
      bgLayoutImgList={[]}
      {...layoutMenu}
      location={{
        pathname,
      }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        title: 'Clark',
        size: 'small',
      }}
      actionsRender={props => {
        if (props.isMobile) return [];
        return [];
      }}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            // console.log('item:', item);
            if (item.isUrl) {
              window.open(item.path || '');
            } else {
              setPathname(item.path || '/');
              navigate(item?.path || '/');
            }
          }}
        >
          {dom}
        </div>
      )}
    >
      <PageContainer ghost={false}>
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
};
