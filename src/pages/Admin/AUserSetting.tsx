import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initSetting, changeSetting } from '@/reducers/userSettingReducer';
import { listUserApi } from '@/Services/admin';
import { getSettingApi } from '@/Services/auth';
import PropertyRequiredError from '@/error/PropertyRequiredError';
const { Option } = Select;
interface FieldData {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
}
interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}
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
  const initForm = async () => {
    //不要尝试看懂这段代码，有很多细碎的东西，主要思路是请求得到用户设置，然后转成初始化form所需要的格式，因为后端还有form的数据格式很奇怪
    //所以先把对象转数组，数组又转对象。。。
    try {
      const res = await getSettingApi(props.match.params.id);
      if (
        !res?.data?.hasOwnProperty('id') ||
        !res?.data?.hasOwnProperty('username') ||
        !res?.data?.hasOwnProperty('detail') ||
        !res?.data?.hasOwnProperty('role')
      ) {
        throw new PropertyRequiredError('res');
      }
      const initFormValue = Object.keys(res.data).map(userProperty =>
        userProperty === 'detail'
          ? { name: ['name'], value: [res.data[userProperty]['name']] }
          : { name: [userProperty], value: [res.data[userProperty]] },
      );
      console.log(initFormValue);
      setFields(initFormValue);
    } catch (err) {
      if (err instanceof PropertyRequiredError) {
        message.error('后台数据错误！');
      } else {
        if (err?.response?.status === 404) {
          message.error('用户不存在！');
        } else if (err?.response?.status === 403) {
          message.error('没有权限！');
        } else {
          throw err;
        }
      }
    }
  };
  useEffect(() => {
    //dispatch(initSetting(props.match.params.id)); // 初始化用户信息
    initForm();
  }, []);
  const changeUserSetting = (newSetting: object) => {
    dispatch(changeSetting(newSetting)); // 修改用户信息
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

  interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
  }
  const CustomizedForm: React.FC<CustomizedFormProps> = ({
    onChange,
    fields,
  }) => {
    return (
      <Form
        name="global_state"
        {...layout}
        fields={fields}
        onFieldsChange={(changedFields, allFields) => {
          //onChange(allFields);
        }}
        onFinish={onFinish}
      >
        <Form.Item name="id" label="id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="用户名"
          rules={[{ required: true, message: '请填写用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: '请填写账号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="角色"
          rules={[{ required: true, message: '请填写角色' }]}
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
  };
  const [fields, setFields] = useState([]);
  const UserSettingForm = () => {
    return (
      <>
        <CustomizedForm
          fields={fields}
          onChange={newFields => {
            setFields(newFields);
          }}
        />
      </>
    );
  };

  return (
    <>
      <UserSettingForm />
    </>
  );
}

export default AUserSetting;
