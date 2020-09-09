import React,{useState,useEffect} from 'react'
import {Card, Form, Input, Button,Tooltip,message  } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './User.css'
import { getnotifyApi, changenotifyApi } from '@/Services/auth';
import { getUserID } from '@/Utils/auth';
import {useDispatch,useSelector} from 'react-redux'
import {changeUserinfo} from '../../reducers/userReducer'
const Changeuser=(props:any) => {
    const userinfo = useSelector(state=>state)
    const dispatch = useDispatch()
    const onFinish = values => {
        console.log('Success:', values);
        changenotifyApi(getUserID(),values.wechat,values.email).then(res=>{
            dispatch(changeUserinfo(values.wechat,values.email))
            console.log(res)
            message.success('保存成功！')
            props.toggleshow()
        }).catch(err=>{console.log(err)})//先用then后面再改成async，这里用户修改数据后按提交，把数据用api传到服务器，然后dispatch改变当前状态，然后返回到原来的展览页面
         
      };
    
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
