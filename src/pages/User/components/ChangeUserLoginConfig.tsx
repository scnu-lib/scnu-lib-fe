import React from 'react';
import { Form, Input, Button } from 'antd';
export default function ChangeUserLoginConfig({
  layout,
  onFinish,
  tailLayout,
}: any) {
  return (
    <Form name="notify-form" onFinish={onFinish} {...layout}>
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
              if (
                (!value && !getFieldValue('password')) ||
                (value && getFieldValue('password'))
              ) {
                return Promise.resolve();
              } else if (value && !getFieldValue('password')) {
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
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (
                (value && getFieldValue('currentPassword')) ||
                (!value && !getFieldValue('currentPassword'))
              ) {
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
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
