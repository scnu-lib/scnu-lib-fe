import React from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  message,
} from 'antd';
import {  getNextAvailableIDApi, loginApi, signUpApi } from '@/Services/auth';
import PropertyRequiredError from '@/error/PropertyRequiredError';
import { setRole, setToken, setUserID } from '@/Utils/auth';
//注册页面
const { Option } = Select;
function SignUp(props: any) {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const [form] = Form.useForm();

  const onFinish = async (values: object) => {
    const user = {
      username: values.email,
      password: values.password,
      detail: {
        name: values.nickname,
        college:values.college,
        studentId:values.studentId
      },
    };
    try {
      console.log(user);
      const res = await signUpApi(user);
      if (!res) {
        throw new PropertyRequiredError('res');
      }
      if (!res?.hasOwnProperty('data')) {
        throw new PropertyRequiredError('data');
      }
      if (
        !res?.data?.hasOwnProperty('id') ||
        !res?.data?.hasOwnProperty('role') ||
        !res?.data?.hasOwnProperty('username')
      ) {
        throw new PropertyRequiredError('data');
      }
      props.history.push('/login');
      message.success('注册成功');
    } catch (err) {
      console.log(err.response);
      if (err.response?.status === 400) {
        if (err.response?.data.message === 'error.userexists')
          message.error('该帐号已被注册');
        else if (err.response?.data.message === 'error.malformed_request')
          message.error('格式错误');
        else if (err instanceof PropertyRequiredError) {
          message.error('Oops！遇到了未知的错误');
        } else {
          message.error('Oops！遇到了未知的错误');
        }
      } else if(err.response?.title === "Login name already used!"){
        message.error('该帐号已被注册');
      } 
      else {
        console.log(err.message);
        message.error('Oops！遇到了未知的错误');
      }
    }
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card className="login-Card">
        <div className="sign-title">注册帐户</div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          style={{ margin: '1vw' }}
        >
          <Form.Item
            name="nickname"
            rules={[
              { required: true, message: '请输入你的昵称', whitespace: true },
            ]}
          >
          <Input placeholder="昵称" />
          </Form.Item>
          <Form.Item
            name="studentId"
            rules={[
              {
                pattern: /^[0-9]*$/,
                message: '只能使用数字组合',
              },
              { required: true, message: '请输入你的学号', whitespace: true },
            ]}
          >
            <Input placeholder="学号" />
          </Form.Item>
          <Form.Item
            name="college"
            rules={[
              { required: true, message: '请输入你的学院', whitespace: true },
            ]}
          >
            <Input placeholder="学院" />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              {
                pattern: /\w+$/,
                message: '只能使用数字、字母和下划线组合',
              },
              { required: true, message: '请输入你的帐号', whitespace: true },
            ]}
          >
            <Input placeholder="帐号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                min: 6,
                message: '请输入大于5个字符的密码',
              },
              {
                max: 20,
                message: '请输入小于20个字符的密码',
              },
              {
                required: true,
                message: '请输入你的密码',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认你的密码',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('确认密码与密码不一致');
                },
              }),
            ]}
          >
            <Input.Password placeholder="确认密码" />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('请同意用户协议'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              我已经阅读并同意 <a href="">用户协议</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>{' '}
            或
            <Button type="link" onClick={() => props.history.push('/login')}>
              已经有帐号了？现在登录
            </Button>
            {' '}
            <Button type="link" onClick={() => props.history.push('/')}>
              不想登录？先随便看看
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default SignUp;
