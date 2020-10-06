import React from 'react'
import { Form, Input, Button, Checkbox,Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './SignIn.css'
import {loginApi} from '../../Services/auth'
import { setToken,setUserID } from '../../Utils/auth';
import { changeUserID } from '@/reducers/UserAction';

//登录页面
function SignIn(props:any) {
    const onFinish = async (values:any) => {
        const user = {
            username:values.username,
            password:values.password
        }
        try{
            const res = await loginApi(user)//post得到token后设置缓存，跳转刷新
            console.log(res)
            const Payload = decodeURIComponent(escape(window.atob((res.data.jwt).split('.')[1])))
            const UserID = JSON.parse(Payload).name//从jwt获得userid
            console.log(UserID)
            setToken(res.data.jwt)
            setUserID(UserID)
            props.history.push('/')
            message.success('登录成功！')
            
        }catch(err){
            //登录错误
            if(err.response.data.code==='error.account.login.invalid_credential')
               message.error('用户名或密码错误！')
            else if(err.response.data.code==='error.generic.malformed_request')
              message.error('格式错误！')
        }
    }
    return (
      <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Card className="login-Card">
             <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入你的用户名！' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入你的密码！' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        或 <a href="http://localhost:8000/#/signup">现在注册！</a>
      </Form.Item>
    </Form>
        </Card>
        </div>
    )
}

export default SignIn