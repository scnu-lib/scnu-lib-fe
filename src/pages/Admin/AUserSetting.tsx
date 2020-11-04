import React,{useEffect} from 'react'
import { Form, Input, Button, Select } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import {initSetting,changeSetting} from '@/reducers/usersettingReducer'
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function AUserSetting(props:any) {
    const [form] = Form.useForm();
    const usersetting = useSelector(store=>store.setting)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(initSetting(props.match.params.id))
        console.log(usersetting)
    },[])
    const changeusersetting = (newsetting:object) => {
        dispatch(changeSetting(newsetting))
    }
    const onFinish = values => {
      changeusersetting(values)
    };

    return (
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="id" label="id" rules={[{ required: true }]} initialValue={usersetting.id}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="用户名" rules={[{ required: true, message:'请填写用户名！' }]} initialValue={usersetting.detail.name}>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="账号" rules={[{ required: true, message:'请填写账号！' }]} initialValue={usersetting.username}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message:'请填写密码！' }]} initialValue={usersetting.password}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="角色" rules={[{ required: true , message:'请填写角色！'}]} initialValue={usersetting.role}>
          <Select
            placeholder="请选择一种角色"

            allowClear
          >
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

export default AUserSetting
