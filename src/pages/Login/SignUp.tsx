import React from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { signUpApi } from '@/Services/auth';
import history from 'umi';
import PropertyRequiredError from '@/error/PropertyRequiredError';
//注册页面
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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
      message.success('注册成功！');
    } catch (err) {
      console.log(err.response);
      if (err.response?.status === 400) {
        if (err.response?.data.message === 'error.userexists')
          message.error('用户名已被使用!');
        else if (err.response?.data.message === 'error.malformed_request')
          message.error('格式错误！');
        else if (err instanceof PropertyRequiredError) {
          message.error('Oops！后台数据出错，请联系程序猿');
        } else {
          message.error('Oops!遇到了未知错误，请联系程序猿');
        }
      } else {
        console.log(err.message);
        message.error('Oops!遇到了未知错误，请联系程序猿');
      }
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const inputformitemstyle = {
    width: '95%',
    height: '95%',
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
        <div className="sign-title">注册账户</div>
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
            name="email"
            rules={[
              { required: true, message: '请输入你的邮箱', whitespace: true },
            ]}
          >
            <Input placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                min: 6,
                message: '请输入大于6个字符的密码',
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
              已经有账号了？现在登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default SignUp;
