import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initSetting, changeSetting } from '@/reducers/userSettingReducer';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function AUserSetting(props: any) {
  const [form] = Form.useForm();
  const userSetting = useSelector(store => store.userSetting);
  const dispatch = useDispatch();
  console.log(userSetting.detail.name);
  useEffect(() => {
    dispatch(initSetting(props.match.params.id)); // 初始化用户信息
  }, []);
  const changeUserSetting = (newSetting: object) => {
    dispatch(changeSetting(newSetting)); // 修改用户信息
  };
  const onFinish = (values: object) => {
    changeUserSetting(values);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="id"
        label="id"
        rules={[{ required: true }]}
        initialValue={userSetting.id}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="用户名"
        rules={[{ required: true, message: '请填写用户名！' }]}
        initialValue={userSetting.detail.name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="账号"
        rules={[{ required: true, message: '请填写账号！' }]}
        initialValue={userSetting.username}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请填写密码！' }]}
        initialValue={userSetting.password}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="role"
        label="角色"
        rules={[{ required: true, message: '请填写角色！' }]}
        initialValue={userSetting.role}
      >
        <Select placeholder="请选择一种角色" allowClear>
          <Option value="ROLE_USER">用户</Option>
          <Option value="ROLE_LIBRARIAN">图书管管理员</Option>
          <Option value="ROLE_ADMIN">管理员</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AUserSetting;
