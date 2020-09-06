import React,{useState,useEffect} from 'react'
import {Card, Form, Input, Button,Tooltip,message  } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './User.css'
import { getnotifyApi, changenotifyApi } from '@/Services/auth';
import { getUserID } from '@/Utils/auth';
//User


const User = (props:any) => {
    const [userinfo,setUserinfo] = useState({ wechat:{wxid:''},email:{address:''}})
    const [init,setInit] = useState(false)//解决state异步问题
    const updatenotify = () => {
        getnotifyApi(getUserID()).then(res=>{
            const notify = {
                wechat:{wxid:res.data.wechat.wxid},email:{address:res.data.email.address}
            }
            setUserinfo(notify)
            console.log(userinfo)
        }).catch(err => console.log(err))
    }
    const changenotify = (values:object) =>{
            changenotifyApi(getUserID(),values.wechat,values.email).then(res=>{
                const notify = {
                    wechat:{wxid:res.data.wechat.wxid},email:{address:res.data.email.address}
                }
                setUserinfo(notify)
                console.log(userinfo)
            }).catch(err=>{
                console.log(err)
            })
       
    }
    useEffect(()=>{
        updatenotify()
        //setUserinfo(2)
        
    },[])
    const onFinish = values => {
        console.log('Success:', values);
        changenotify(values)
        console.log(userinfo)
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
        </Card>
    )
}

export default User
