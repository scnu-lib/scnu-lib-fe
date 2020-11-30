import { withRouter } from 'react-router-dom';
import React from 'react';
import { Layout, Menu } from 'antd';
import './AdminAct.css';
import { adminRoutes } from '../../Routes/routes';
const { Content, Sider } = Layout;

function AdminAct(props: any) {
  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <div className="site-layout-sider">
            <Sider className="site-layout-background" width="100%">
              <Menu
                mode="inline"
                defaultSelectedKeys={['/home/adminAct/listact']}
                defaultOpenKeys={['/home/adminAct/listact']}
                style={{ height: '100%' }}
              >
                {adminRoutes.map(route => {
                  return route.isShow ? (
                    <Menu.Item
                      key={route.path}
                      onClick={p => props.history.push(p.key)}
                    >
                      {route.title}
                    </Menu.Item>
                  ) : null; // 根据token判断显示是否登录
                })}
              </Menu>
            </Sider>
          </div>
          <Content
            style={{
              padding: '10px 24px',
              minWidth: '400px',
              minHeight: '800px',
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default withRouter(AdminAct);
