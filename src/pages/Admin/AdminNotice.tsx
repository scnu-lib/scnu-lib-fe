import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import '../User/User.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo, initUserInfo } from '../../reducers/userReducer';
import { getNotifyApi } from '../../Services/auth';
function AdminNotice(props: any) {
  const userInfo = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    getNotifyApi(props.match.params.id)
      .then(res => {
        dispatch(initUserInfo(res.data));
      })
      .catch(err => {
        message.error('Oops!发生了未知的错误');
      });
  }, []);
  const changeNotify = (values: object) => {
    dispatch(
      changeUserInfo(values.wechat, values.email, props.match.params.id),
    );
  };
  const onFinish = (values: object) => {
    changeNotify(values);
  }; // 把后端通信整合到actioncreator中返回的函数

  return (
    <div>
      <Form name="notify-form" onFinish={onFinish}>
        <Form.Item
          label="微信号"
          name="wechat"
          rules={[{ required: true, message: '请输入你的微信号！' }]}
          initialValue={userInfo.wechat?.wxid}
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
          initialValue={userInfo.email?.address}
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
}

export default AdminNotice;
