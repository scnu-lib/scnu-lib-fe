import React, { useState, useEffect } from 'react';
import {  Form, Input, Button, message } from 'antd';
import './User.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginInUserInfo } from '@/reducers/loginInUserInfoReducer';
import { changeSettingApi } from '@/Services/auth';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const ChangeUser = (props: any) => {
  const userInfo = useSelector(state => state.loginInUser);
  const userSetting = useSelector(state=>state.loginInUserSetting);
  const dispatch = useDispatch();
  const changeNotify = (values: object) => {
    dispatch(changeLoginInUserInfo(values.wechat, values.email));
  };
  const changeUserSetting = (newSetting: object) => {
    // 修改用户信息
    const handlyNewSetting = {
      detail:{}
      //处理表单传来的数据
    };

    console.log(newSetting);
    Object.keys(newSetting).forEach(set => {
      //表单修改数据后value会从数组变成字符串，直接在这边根据是数组还是字符串重新组织对象
      console.log(newSetting[set]);
      if (set !== 'password' && set !== 'email' && set !== 'wechat') {
        //password不理，在后面处理
        if (set === 'name' || set === 'college' || set === 'studentId') {
          //name在后端的属性不一样，独立拿出来处理。
          handlyNewSetting.detail[set] = newSetting[set] ;
        } else {
          handlyNewSetting[set] = newSetting[set];
        }
      }
      console.log(handlyNewSetting);
    });

    if (newSetting.password === undefined) {
      //判断是否改了密码，不改传空改了传值
      handlyNewSetting.newPassword = '';
      handlyNewSetting.currentPassword = '';
    } else {
      handlyNewSetting.newPassword = newSetting.password;
      handlyNewSetting.currentPassword = newSetting.currentPassword;
    }
    console.log(handlyNewSetting);
    changeSettingApi(newSetting.id, handlyNewSetting).then(res=>{
      //message.success('修改成功');
    }).catch (err => {
      //message.error('Oops!发生了未知的错误');
    })
   
     
  };
  const onFinish = (values: object) => {
    console.log(values);
    changeNotify(values);
    changeUserSetting(values);
    //message.success('保存成功！');
  }; //把后端通信整合到actioncreator中返回的函数

  return (
    <div>
      <Form
        name="notify-form"
        onFinish={onFinish}
        {...layout}
      >
         <Form.Item name="id" label="id" rules={[{ required: true }]} initialValue={userSetting?.id}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="用户名"
          initialValue={userSetting?.detail?.name}
          rules={[{ required: true, message: '请填写用户名' }]}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          name="username"
          label="账号"
          initialValue={userSetting?.username}
          rules={[{ required: true, message: '请填写账号' }]}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          name="college"
          label="学院"
          initialValue={userSetting?.detail?.college}
          rules={[{ required: true, message: '请填写学院' }]}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          name="studentId"
          label="学号"
          initialValue={userSetting?.detail?.studentId}
          rules={[{ required: true, message: '请填写学号' }]}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          name="currentPassword"
          label="旧密码"

          dependencies={['password']}
            hasFeedback
            rules={[
              {
                min: 6,
                message: '请输入大于5个字符的密码',
              },
              {
                max: 20,
                message: '请输入小于20个字符的密码',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if ((!value&&!getFieldValue('password'))||(value&&getFieldValue('password'))) {
                    return Promise.resolve();
                  }else if(value&&!getFieldValue('password')){
                    return Promise.resolve();
                  }
                  return Promise.reject('请输入旧密码');
                },
              }),
            ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"
          dependencies={['currentPassword']}
          rules={[
            {
              min: 6,
              message: '请输入大于5个字符的密码',
            },
            {
              max: 20,
              message: '请输入小于20个字符的密码',
            },({ getFieldValue }) => ({
              validator(rule, value) {
                if ((value&&getFieldValue('currentPassword'))||(!value&&!getFieldValue('currentPassword'))) {
                  return Promise.resolve();
                }
                return Promise.reject('请输入新密码');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="微信号"
          name="wechat"
          rules={[{ required: true, message: '请输入你的微信号！' }]}
          initialValue={userInfo?.wechat?.wxid}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: '请输入你的邮箱！' },
            {
              type: 'email',
              message: '请输入正确格式的邮箱地址！',
            },
          ]}
          initialValue={userInfo?.email?.address}
        >
          <Input />
        </Form.Item>
        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeUser;
