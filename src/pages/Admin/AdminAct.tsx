import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './AdminAct.css';
import { adminRoutes } from '../../Routes/routes';
import { Link } from 'umi';
const { Header, Content, Footer, Sider } = Layout;

function AdminAct(props: any) {
  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
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
                ) : null; //根据token判断显示是否登录
              })}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 440 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default withRouter(AdminAct);
