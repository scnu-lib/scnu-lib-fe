import React,{useEffect,useState} from 'react';
import { Form, Card, Input, Button, InputNumber,DatePicker, Space,TimePicker, message  } from 'antd';
import moment from 'moment';
import { createactApi,changeactApi } from '@/Services/activity';
import {useSelector,useDispatch} from 'react-redux'
import { initList } from '@/reducers/actReducer';
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY-MM-DD HH:mm:ss'
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
  let cardtitle = '修改活动'
  const initId = Number(props.location.pathname.slice(25))//url传参，判断是修改还是创建
  const dispatch = useDispatch()
  const getAct = (page:number = 0)=>{
    dispatch(initList('all',page,20))
  }
  useEffect(()=>{getAct()},[])
  let act = {
  }//只用做初始化，可以用let就行
  act = useSelector(store=>store.act[initId]) //存储有、无活动内容 刷新后store就又没了。。。
  if(!props.location.pathname.slice(25) === true){
    act = {}//不要在条件循环里面调用hook，不然可能会顺序错误
    cardtitle = '创建活动'
  }
  

  const onFinish = async (values: any) => {
    
    const startTime = values.act.startendTime[0].format(dateFormat)
    const endTime = values.act.startendTime[1].format(dateFormat)
    const signUpDeadline = values.act.signUpDeadline.format(dateFormat)
    const finalact = { startTime,endTime,signUpDeadline,
      title:values.act.title,
      maxParticipant:values.act.maxParticipant,
      location:values.act.location,
      labels:values.act.labels,
      description:values.act.description}
    console.log(finalact)
    try{
    if(!props.location.pathname.slice(25) === false){
      const res = await changeactApi(+props.location.pathname.slice(25),finalact)

      console.log(res)
    }else{
    const res = await createactApi(finalact)
    console.log(res)
  }
    
    message.success('发布成功！')
    //props.history.push('/')
    }catch(err){
      console.log(err)
      message.error('发布失败！')
    }
  };

  
  return (
    <Card title={cardtitle}>
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
          initialValue={act.title}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['act', 'startendTime']} label="活动开始、结束时间" rules={ [{ type: 'array', required:true, message: '请选择活动开始、结束的时间！' }]}>
        <RangePicker showTime format={dateFormat} />
      </Form.Item>
      <Form.Item name={['act', 'signUpDeadline']} label="报名截止时间" rules={[{ type: 'object', required: true, message: '请选择报名截止时间！' }]}>
        <DatePicker showTime format={dateFormat} />
      </Form.Item>
        <Form.Item
          name={['act', 'maxParticipant']}
          label="活动最大人数"
          rules={[{ type: 'number', min: 0, },{required:true}]}
          initialValue={act.maxParticipant}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['act', 'location']}
          label="活动地点"
          rules={[{required:true}]}
          initialValue={act.location}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['act', 'labels']}
          label="活动标签（标签之间用逗号隔开）"
          rules={[{required:true}]}
          initialValue={act.labels}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['act', 'description']} label="活动简介" rules={[{required:true}]} initialValue={act.description}>
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
