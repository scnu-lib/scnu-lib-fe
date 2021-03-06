import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './SignIn.css';
import { loginApi } from '../../Services/auth';
import { setToken, setUserID, setRole } from '../../Utils/auth';
import PropertyRequiredError from '../../error/PropertyRequiredError';

//登录页面
function SignIn(props: any) {
  const onFinish = async (values: object) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    try {
      const res = await loginApi(user); //post得到token后设置缓存，跳转刷新
      console.log(res);
      if (!res?.hasOwnProperty('data') || !res?.data?.hasOwnProperty('jwt')) {
        throw new PropertyRequiredError('jwt'); //jwt中属性不合法抛出错误
      }
      const payload = decodeURIComponent(
        escape(window.atob(res?.data?.jwt?.split('.')[1])),
      );
      const userID = JSON.parse(payload).userID; //从jwt获得userid
      const role = JSON.parse(payload).auth; //从jwt获得roles
      setToken(res.data.jwt);
      setUserID(userID);
      setRole(role);
      location.replace('/');
      message.success('登录成功');
    } catch (err) {
      //登录错误
      if (err instanceof PropertyRequiredError) {
        message.error('后台数据错误');
      } else {
        if (
          err.response?.data.code === 'error.account.login.invalid_credential'
        )
          message.error('帐号不存在或密码错误');
        else if (err.response?.data.code === 'error.generic.malformed_request')
          message.error('格式错误');
        else if (err instanceof PropertyRequiredError) {
          message.error('Oops！后台数据错误，请联系程序猿');
        } else {
          message.error('帐号不存在或密码错误');
        }
      }
    }
  };
  return (
    <div className="login-bg">
      <Card className="login-Card">
        <div className="sign-title">登录</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入你的帐号' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="帐号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入你的密码' }]}
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            {'   '}或{' '}
            <Button type="link" onClick={() => props.history.push('/Signup')}>
              现在注册！
            </Button>{' '}
            <Button type="link" onClick={() => props.history.push('/')}>
              不想登录？先随便看看
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default SignIn;
