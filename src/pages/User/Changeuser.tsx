import React,{useState,useEffect} from 'react'
import {Card, Form, Input, Button,Tooltip,message  } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './User.css'
import { getnotifyApi, changenotifyApi } from '@/Services/auth';
import { getUserID } from '@/Utils/auth';
import {useDispatch,useSelector} from 'react-redux'
import {changeUserinfo} from '../../reducers/userReducer'
const Changeuser=(props:any) => {
    const userinfo = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const changenotify = (values:object) => {
            dispatch(changeUserinfo(values.wechat,values.email))
    }
    const onFinish = values => {
        changenotify(values)
        message.success('保存成功！')
        props.toggleshow()
        }//把后端通信整合到actioncreator中返回的函数
         
    
      const onFinishFailed = errorInfo => {
        message.error('格式错误！')
      };
    return (
        <div>
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
            initialValue={userinfo.wechat.wxid}
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
            initialValue={userinfo.email.address}
        >
            <Input />
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit">
            保存
            </Button>
            </Form.Item>
            </Form>
        </div>
    )
}

export default Changeuser
