import React from 'react';
import { Form, Card, Input, Button, InputNumber,DatePicker, Space,TimePicker, message  } from 'antd';
import moment from 'moment';
import { createactApi } from '@/Services/activity';
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label}必须填写！',
  types: {
    number: '${label} 不是一个有效数字！',
  },
  number: {
    range: '${label}不能小于${min}',
  },
};

//创建活动页
function CreateAct(props: any) {
  const onFinish = async (values: any) => {
    const startTime = values.act.startendTime[0].format('YYYY-MM-DD HH:mm:ss')
    const endTime = values.act.startendTime[1].format('YYYY-MM-DD HH:mm:ss')
    const signUpDeadline = values.act.signUpDeadline.format('YYYY-MM-DD HH:mm:ss')
    const act = {
      startTime,endTime,signUpDeadline,
      title:values.act.title,
      maxParticipant:values.act.maxParticipant,
      location:values.act.location,
      labels:values.act.labels,
      description:values.act.description
    }
    console.log(act)
    try{
    const res = await createactApi(act)
    console.log(res)
    message.success('发布成功！')
    props.history.push('/')
    }catch(err){
      console.log(err)
      message.error('发布失败！')
    }
  };

  return (
    <Card title="创建活动">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['act', 'title']}
          label="标题"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['act', 'startendTime']} label="活动开始、结束时间" rules={ [{ type: 'array', required: true, message: '请选择活动开始、结束的时间！' }]}>
        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item name={['act', 'signUpDeadline']} label="报名截止时间" rules={[{ type: 'object', required: true, message: '请选择报名截止时间！' }]}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
        <Form.Item
          name={['act', 'maxParticipant']}
          label="活动最大人数"
          rules={[{ type: 'number', min: 0, },{required:true}]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['act', 'location']}
          label="活动地点"
          rules={[{required:true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['act', 'labels']}
          label="活动标签（标签之间用逗号隔开）"
          rules={[{required:true}]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['act', 'description']} label="活动简介" rules={[{required:true}]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CreateAct;
