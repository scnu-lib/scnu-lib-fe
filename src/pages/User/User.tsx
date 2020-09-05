import React,{useState,useEffect} from 'react'
import {Card, Form, Input, Button,Tooltip,message  } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './User.css'
//User


function User(props:any) {
    const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        message.error('格式错误！')
      };
    return (
        <Card className='notify-card' title="修改/保存你的联系方式">
        <Form
        name="notify-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            label="微信号"
            name="wechat"
            rules={[{ required: true, message: '请输入你的微信号！' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: '请输入你的邮箱！'},{
                type: 'email',
                message:'请输入正确格式的邮箱地址！'
            }]}
        >
            <Input />
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit">
            保存
            </Button>
        </Form.Item>
        </Form>
        </Card>
    )
}

export default User
