import React from 'react'
import { history,Link } from 'umi';
import { Layout, Menu,Button,Dropdown,Avatar,Badge  } from 'antd';
import { activityRoutes } from '../../Routes/routes';
import { isLogined, clearToken } from '../../Utils/auth';
import { DownOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
function Frame(props:any) {
  const menu = (
    <Menu onClick={p=>{//下拉菜单几个选项跳转，在home.tsx架设route
      if(p.key === 'logout')
      {
        clearToken()
        history.push('/')
      }else if(p.key === 'User'){
        history.push('/home/user')
      }else if(p.key === 'notion'){
        history.push('/home/notions')
      }else{
        history.push('/')
      }
    }}>
      <Menu.Item key='User'>
          用户中心
      </Menu.Item>
      <Menu.Item key='notion'>
          通知中心 <Badge count={25} />
      </Menu.Item>
      <Menu.Item key='logout'>
          退出
      </Menu.Item>
    </Menu>
  );
  const switchloginuser = ():any =>{//鉴权判断登录框显示
    if(isLogined())
    {//antd的子组件也不能同时传入多个
      return (<Dropdown overlay={menu}>
       <label>
       <Avatar>u</Avatar>username <DownOutlined />
          </label>
      </Dropdown>)
    }
    return ( <Button type="text" onClick={()=>{ history.push('/login')}}>注册|登录</Button>)
  }
    return (
    <Layout className="layout">
    <Header  >
      <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{width:'50%'}}>
        {activityRoutes.map(route=>{
            return route.isShow?(<Menu.Item key={route.path} 
            ><Link to={route.path}>{route.title}</Link></Menu.Item>):null;//根据token判断显示是否登录
        } )}
          
      </Menu>
      <div className='sign-in-up' style={{height:'100%'}}> 
     {switchloginuser()}
     </div>
    </Header>
    <Content style={{ padding: '0 50px',
                    height:'100%'}}>
      <div className="site-layout-content">{props.children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
    )
}

export default Frame
//BUG 刷新后