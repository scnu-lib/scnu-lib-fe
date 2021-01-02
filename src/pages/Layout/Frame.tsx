import React, { useEffect } from 'react';
import { history, Link } from 'umi';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { activityRoutes } from '../../Routes/routes';
import {
  isLogined,
  clearToken,
  clearUserID,
  clearRole,
  getUserID,
} from '../../Utils/auth';
import { DownOutlined } from '@ant-design/icons';
import './Frame.less';
import { changeClient } from '@/reducers/globalConfigReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initUserInfo } from '@/reducers/userReducer';
const { Header, Content, Footer } = Layout;
function Frame(props: any) {
  const dispatch = useDispatch();
  const userInfo = useSelector(store => store.user);
  useEffect(() => {
    if (isLogined()) {
      console.log(getUserID());
      dispatch(initUserInfo(getUserID()));
    }
  }, []);
  const docEl = document.documentElement;
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize'; // 移动端切换横屏或窗口大小改变
  const recalc = function() {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    dispatch(changeClient(clientWidth));
  };
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  const menu = (
    <Menu
      onClick={p => {
        // 下拉菜单几个选项跳转，在home.tsx架设route
        if (p.key === 'logout') {
          clearToken();
          clearUserID();
          clearRole();
          history.push('/');
          location.reload();
        } else if (p.key === 'User') {
          history.push('/home/user');
        } else {
          history.push('/');
        }
      }}
    >
      <Menu.Item key="User">用户中心</Menu.Item>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );

  const SwitchLoginUser = (): any => {
    // 鉴权判断登录框显示
    if (isLogined()) {
      // antd的子组件也不能同时传入多个
      return (
        <Dropdown overlay={menu}>
          <label>
            <Avatar>C</Avatar>
            <div className="userName">{userInfo?.detail?.name}</div>{' '}
            <DownOutlined />
          </label>
        </Dropdown>
      );
    }
    return (
      <Button
        type="text"
        onClick={() => {
          history.push('/login');
        }}
      >
        注册 | 登录
      </Button>
    );
  };
  return (
    <Layout className="layout">
      <Header className="navbg_selector">
        <div className="LOGO-Menu">
          <a
            className="LOGO"
            onClick={() => {
              history.replace('/');
            }}
          ></a>
          <Menu
            className="navbg_selector"
            mode="horizontal"
            defaultSelectedKeys={['/home/activity']}
          >
            {activityRoutes.map(route => {
              return route.isShow ? (
                <Menu.Item key={route.path}>
                  <Link to={route.path}>{route.title}</Link>
                </Menu.Item>
              ) : null; // 根据token判断显示是否登录
            })}
          </Menu>
        </div>

        <div className="sign-in-up">{SwitchLoginUser()}</div>
      </Header>
      <div
        className="Hero ant-layout-content"
        style={{ color: '@primary-color' }}
      >
        <h2 className="Hero-title">欢迎来到阅马活动系统</h2>
        <p>华南师大图书馆————活动发布、报名、签到</p>
        <div className="Hero-href">
          <a>QQ群</a> - <a>关于</a> - <a>联系我们</a>
        </div>
      </div>
      <Content className="layout-content">
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>华师阅马开发小分队</Footer>
    </Layout>
  );
}

export default Frame;
// BUG 刷新后
