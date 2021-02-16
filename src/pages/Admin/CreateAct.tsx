import React, { useEffect, useState } from 'react';
import {
  Form,
  Card,
  Input,
  Button,
  InputNumber,
  message,
  Upload,
  Checkbox,
  Mentions,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createActApi, changeActApi, detailApi } from '@/Services/activity';
import { useSelector, useDispatch } from 'react-redux';
import { initActDetail } from '@/reducers/actDetailReducer';
import PropertyRequiredError from '@/error/PropertyRequiredError';
import DatePicker from '../../components/DatePicker';
import format from 'dayjs';
import { initList } from '@/reducers/actReducer';
import { actLabel } from '@/Utils/config';
import UpLoadPhoto from '@/components/UpLoadPhoto';
const { Option } = Mentions;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const validateMessages = {
  required: '${label}必须填写',
  types: {
    number: '${label} 不是一个有效数字',
  },
  number: {
    range: '${label}不能小于${min}',
  },
};
function disabledDate(current: object) {
  // Can not select days before today and today
  return current && current < format().endOf('day');
}
//创建活动页
function CreateAct(props: any) {
  let cardTitle = '修改活动';
  const initId = props.location.pathname.slice(25); //url传参，判断是修改还是创建
  const dispatch = useDispatch();
  const getAct = () => {
    if (!props.location.pathname.slice(25)) {
    } else {
      console.log(props);
      setState({ imageUrl: act?.src, loading: false });
      setVolCheckBox(act?.volunteered); //初始化各个组件
    }
  };
  useEffect(() => {
    getAct();
  }, []);
  let act = {}; //只用做初始化，可以用let就行
  act = useSelector(store => store.actDetail); //存储有、无活动内容 刷新后store就又没了。。。
  if (!props.location.pathname.slice(25)) {
    act = {}; //不要在条件循环里面调用hook，不然可能会顺序错误
    cardTitle = '创建活动';
  }
  const changeTimeFormat = (time: string) => {
    //我啪的一下把格式转成后端的格式，很快啊
    const arr = time.split(' ');
    arr.splice(1, 0, 'T');
    arr.splice(3, 0, 'Z');
    return arr.join('');
  };
  const onFinish = async (values: any) => {
    try {
      //if (!state?.imageUrl) {
      //  throw new PropertyRequiredError('imageUrl');
      //}
      const startTime = changeTimeFormat(
        values.act.startEndTime[0].format(dateFormat),
      );
      const endTime = changeTimeFormat(
        values.act.startEndTime[1].format(dateFormat),
      );
      const signUpDeadline = changeTimeFormat(
        values.act.signUpDeadLine.format(dateFormat),
      );
      if (signUpDeadline > startTime) {
        message.error('报名截止日期必须小于活动开始日期');
        return;
      }
      if (startTime > endTime) {
        message.error('活动开始日期必须小于活动结束日期');
        return;
      }
      let processLabels = values.act.labels.split(' ');
      const finalAct = {
        startTime,
        endTime,
        signUpDeadline,
        title: values.act.title,
        maxParticipant: values.act.maxParticipant,
        currentParticipant: 0,
        location: values.act.location,
        labels: processLabels.map(label => label.slice(1)), //分割后把@去掉
        detail: { description: values.act.description },
        volunteered: volCheckBox,
        //maxVolParticipant: String(values.act.maxVolParticipant),
      };
      console.log(finalAct);
      if (!props.location.pathname.slice(25) === false) {
        const res = await changeActApi(
          +props.location.pathname.slice(25),
          finalAct,
        );
        console.log(res);
        if (
          res?.hasOwnProperty('title') ||
          res?.hasOwnProperty('maxParticipant') ||
          res?.hasOwnProperty('location') ||
          res?.hasOwnProperty('labels') ||
          res?.hasOwnProperty('description') ||
          res?.hasOwnProperty('volState') ||
          res?.hasOwnProperty('maxVolParticipant')
        ) {
          throw new PropertyRequiredError('res');
        }
      } else {
        console.log(finalAct);
        const res = await createActApi(finalAct);
        console.log(res);
      }
      console.log(finalAct);
      message.success('发布成功'); //发布成功后刷新store和页面
      dispatch(initList('all'));
      setTimeout(() => props.history.push('/'), 100);
    } catch (err) {
      if (err instanceof PropertyRequiredError) {
        if (err.property === 'imageUrl') {
          message.error('请上传封面');
        } else {
          message.error('后台数据错误');
        }
      } else if (err?.response?.status === 400) {
        message.error('最大参与者数量小于现有参与者数量');
      } else if (err?.response?.status === 401) {
        message.error('权限不足');
      } else if (err?.response?.status === 404) {
        message.error('活动不存在');
      } else {
        message.error('Oops!出现未知错误，请联系程序猿');
      }
    }
  };
  const [volCheckBox, setVolCheckBox] = useState(false);
  const handleVolCheckBoxChange = (e: object) => {
    setVolCheckBox(e.target.checked); //设置志愿者开启的状态
  };
  const [state, setState] = useState({ imageUrl: '', loading: false });

  return (
    <Card title={cardTitle} className="create-act-card">
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
          initialValue={act?.title}
        >
          <Input maxLength={20} />
        </Form.Item>
        <Form.Item
          name={['act', 'signUpDeadLine']}
          label="报名截止时间"
          rules={[
            { type: 'object', required: true, message: '请选择报名截止时间' },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            showTime
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item
          name={['act', 'startEndTime']}
          label="活动开始、结束时间"
          rules={[
            {
              type: 'array',
              required: true,
              message: '请选择活动开始、结束的时间',
            },
          ]}
        >
          <RangePicker
            disabledDate={disabledDate}
            showTime
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          name={['act', 'maxParticipant']}
          label="活动最大人数"
          rules={[{ type: 'number', min: 0 }, { required: true }]}
          initialValue={act?.maxParticipant ? act?.maxParticipant : ''}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={['act', 'location']}
          label="活动地点"
          rules={[{ required: true }]}
          initialValue={act?.location}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['act', 'labels']}
          label="活动标签（输入@选择标签）"
          rules={[
            { required: true, message: '请选择至少一个活动标签' },
            {
              pattern: /(@[\u4e00-\u9fa5]{0,}\s*$)+$/,
              message:
                '请使用@+标签名(eg:@观影沙龙)选择标签，新标签请找管理员添加',
            },
          ]}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValue={
            act?.labels
              ? act?.labels
                  .map((label, index) =>
                    index !== 0 ? ' @' + label : '@' + label,
                  )
                  .join('')
              : ''
          }
        >
          <Mentions rows={1}>
            <Option value={actLabel.filmSalon}>{actLabel.filmSalon}</Option>
            <Option value={actLabel.fridayCinema}>
              {actLabel.fridayCinema}
            </Option>
            <Option value={actLabel.offline}>{actLabel.offline}</Option>
            <Option value={actLabel.online}>{actLabel.online}</Option>
            <Option value={actLabel.pictureBookStory}>
              {actLabel.pictureBookStory}
            </Option>
            <Option value={actLabel.readingClub}>{actLabel.readingClub}</Option>
            <Option value={actLabel.seniorSharingMeeting}>
              {actLabel.seniorSharingMeeting}
            </Option>
          </Mentions>
        </Form.Item>
        <Form.Item
          name={['act', 'description']}
          label="活动简介"
          rules={[{ required: true }]}
          initialValue={act?.detail?.description}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={['act', 'volunteered']} className="volunteerCheckBox">
          <Checkbox
            defaultChecked={act?.volunteered}
            onChange={handleVolCheckBoxChange}
          >
            {'开启志愿者报名'}
          </Checkbox>
        </Form.Item>
        {volCheckBox ? (
          <Form.Item
            name={['act', 'maxVolParticipant']}
            label="最大志愿者人数"
            rules={[{ type: 'number', min: 0 }, { required: true }]}
            initialValue={act?.maxVolParticipant ? act?.maxVolParticipant : ''}
          >
            <InputNumber min={1} defaultValue={10} />
          </Form.Item>
        ) : null}
        <Form.Item label="封面" rules={[{ required: true }]}>
          {initId ? (
            <UpLoadPhoto
              photoKey={`actPhoto${initId}`}
              photoPercentage={2.35}
              photoShowSize={{ width: '100px', height: '60px' }}
            />
          ) : (
            <UpLoadPhoto
              photoKey={`actPhoto`}
              photoPercentage={2.35}
              photoShowSize={{ width: '100px', height: '60px' }}
            />
          )}
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
