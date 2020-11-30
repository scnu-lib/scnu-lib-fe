import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Tooltip, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './User.css';
import { getNotifyApi, changeNotifyApi } from '@/Services/auth';
import { getUserID } from '@/Utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo } from '../../reducers/userReducer';
const ChangeUser = (props: any) => {
  const userInfo = useSelector(state => state.user);
  const dispatch = useDispatch();
  const changeNotify = (values: object) => {
    dispatch(changeUserInfo(values.wechat, values.email));
  };
  const onFinish = (values: object) => {
    changeNotify(values);
    message.success('保存成功！');
    props.toggleShow();
  }; //把后端通信整合到actioncreator中返回的函数

  const onFinishFailed = (errorInfo: object) => {
    message.error('格式错误！');
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeUser;
