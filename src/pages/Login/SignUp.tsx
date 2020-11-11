import React from 'react'
import {
    Card,
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message
  } from 'antd';
  import { QuestionCircleOutlined } from '@ant-design/icons';
import {history} from 'umi'
import { signupApi } from '@/Services/auth';
import Httperror from '@/error/Httperror';
//注册页面
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function SignUp(props:any) {
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
      
        const onFinish = async (values:any) => {
          const user = {
              username:values.email,
              password:values.password,
              details:{
                name:values.nickname},
              
          }
          try{
            const res = await signupApi(user)
            history.push('/login')
            message.success('注册成功！')
          }
          catch(err){
            if(err.response.data.code==='error.account.register.username_exists')
                message.error('用户名已被使用!')
            else if(err.response.data.code==='error.generic.malformed_request')
                message.error('格式错误！')
            else
                throw err
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
        width:'95%',
        height:'95%'
      }
      
    return (
      <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Card >
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{margin:'1vw'}}
      >
        <Form.Item

        name="nickname"
        label=
            '昵称'
            
        rules={[{ required: true, message: '请输入你的昵称！', whitespace: true }]}
        >
        <Input />
        </Form.Item>
        <Form.Item

          name="email"
          label=
              '邮箱'
              
          rules={[{ required: true, message: '请输入你的邮箱！', whitespace: true }]}
          >
<Input />
</Form.Item>
        <Form.Item

          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入你的密码！',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item

          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认你的密码！',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('确认密码与密码不一致！');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item

          name="agreement"
          valuePropName="checked"
          rules={[
            { validator:(_, value) => value ? Promise.resolve() : Promise.reject('请同意协议！') },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
           我已经阅读并同意 <a href=''>用户协议</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
      </Card>
      </div>
    )
}

export default SignUp
