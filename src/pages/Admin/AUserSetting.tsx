import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initSetting, changeSetting } from '@/reducers/userSettingReducer';
import { listUserApi } from '@/Services/admin';
import { changeSettingApi, getSettingApi } from '@/Services/auth';
import PropertyRequiredError from '@/error/PropertyRequiredError';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function AUserSetting(props: any) {
  const userSetting = useSelector(store => store.userSetting);
  const dispatch = useDispatch();
  useEffect(() => {//防止刷新丢失数据
    getSettingApi(props.match.params.id).then(res=>{
      dispatch(initSetting(res.data));
      console.log(res.data)
    }).catch(err=>{
      message.error('Oops!发生了未知的错误');
    })
    
  }, [])
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
      if (set !== 'password') {
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
      handlyNewSetting.currentPassword = '';
    }
    console.log(handlyNewSetting);
    changeSettingApi(newSetting.id, handlyNewSetting).then(res=>{
      message.success('修改成功');
    }).catch (err => {
      message.error('Oops!发生了未知的错误，请联系程序猿');
    })
   
     
  };
  const onFinish = (values: object) => {
    changeUserSetting(values);
    
  };
  interface FieldData {
    //直接在antd上抄，把form的数据向上传递给usestate，为了实现带初始化数据的表单。
    name: string[];
    value: any;
    touched: boolean;
    validating: boolean;
    errors: string[];
  }

  
  const CustomizedForm = () => {
    return (
      <Form
        name="global_state"
        {...layout}
        onFinish={onFinish}
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
          name="role"
          label="角色"
          initialValue={userSetting?.role}
          rules={[{ required: true, message: '请填写角色' }]}
        >
          <Select placeholder="请选择一种角色" allowClear>
            <Option value="ROLE_USER">用户</Option>
            <Option value="ROLE_LIBRARIAN">图书管管理员</Option>
            <Option value="ROLE_ADMIN">管理员</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="新密码"

          rules={[
            {
              min: 6,
              message: '请输入大于5个字符的密码',
            },
            {
              max: 20,
              message: '请输入小于20个字符的密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const UserSettingForm = () => {
    return (
        <CustomizedForm
        />

    );
  };

  return (
    <>
      <UserSettingForm />
    </>
  );
}

export default AUserSetting;
