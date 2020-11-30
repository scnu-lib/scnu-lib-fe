import React, { useEffect, useState } from 'react';
import {
  Form,
  Card,
  Input,
  Button,
  InputNumber,
  DatePicker,
  message,
  Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { changeActApi } from '@/Services/activity';
import { useSelector, useDispatch } from 'react-redux';
import { initActDetail } from '@/reducers/actDetailReducer';
import PropertyRequiredError from '@/error/PropertyRequiredError';
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
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
  let cardTitle = '修改活动';
  const initId = Number(props.location.pathname.slice(25)); //url传参，判断是修改还是创建
  const dispatch = useDispatch();
  const getAct = () => {
    if (!props.location.pathname.slice(25)) {
    } else {
      dispatch(initActDetail(props.match.params.id));
      setState({ imageUrl: act.src, loading: false });
    }
  };
  useEffect(() => {
    getAct();
  }, []);
  let act = {}; //只用做初始化，可以用let就行
  act = useSelector(store => store.act[initId]); //存储有、无活动内容 刷新后store就又没了。。。
  if (!props.location.pathname.slice(25)) {
    act = {}; //不要在条件循环里面调用hook，不然可能会顺序错误
    cardTitle = '创建活动';
  }
  function getBase64(img: Blob, callback: Function) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file: object) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('目前只支持JPG/PNG格式的图片！');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('请上传小于10M的图片！');
    }
    return isJpgOrPng && isLt10M;
  }

  const onFinish = async (values: any) => {
    try {
      if (!state?.imageUrl) {
        throw new PropertyRequiredError('imageUrl');
      }
      const src = state?.imageUrl;
      const startTime = values.act.startEndTime[0].format(dateFormat);
      const endTime = values.act.startEndTime[1].format(dateFormat);
      const signUpDeadLine = values.act.signUpDeadLine.format(dateFormat);
      const finalAct = {
        src,
        startTime,
        endTime,
        signUpDeadLine,
        title: values.act.title,
        maxParticipant: values.act.maxParticipant,
        location: values.act.location,
        labels: values.act.labels,
        description: values.act.description,
      };
      if (!props.location.pathname.slice(25) === false) {
        const res = await changeActApi(
          +props.location.pathname.slice(25),
          finalAct,
        );
        if (
          res?.hasOwnProperty('title') ||
          res?.hasOwnProperty('maxParticipant') ||
          res?.hasOwnProperty('location') ||
          res?.hasOwnProperty('labels') ||
          res?.hasOwnProperty('description')
        ) {
          throw new PropertyRequiredError('res');
        }
      } else {
        const res = await createactApi(finalAct);
        console.log(res);
      }

      message.success('发布成功！');
      //props.history.push('/')
    } catch (err) {
      if (err instanceof PropertyRequiredError) {
        if (err.property === 'imageUrl') {
          message.error('请上传封面！');
        } else {
          message.error('后台数据错误！');
        }
      } else if (err?.response?.status === 400) {
        message.error('最大参与者数量小于现有参与者数量！');
      } else if (err?.response?.status === 401) {
        message.error('权限不足！');
      } else if (err?.response?.status === 404) {
        message.error('活动不存在！');
      } else {
        throw err;
      }
    }
  };
  const [state, setState] = useState({ imageUrl: '', loading: false });
  const handleChange = (info: object) => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Card title={cardTitle} className="create-act-card">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item label="封面" rules={[{ required: true }]}>
          <ImgCrop grid aspect={2.35}>
            <Upload
              name="src"
              listType="picture-card"
              className="actsrc-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {state.imageUrl ? (
                <img
                  src={state.imageUrl}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          name={['act', 'title']}
          label="标题"
          rules={[{ required: true }]}
          initialValue={act?.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['act', 'startendTime']}
          label="活动开始、结束时间"
          rules={[
            {
              type: 'array',
              required: true,
              message: '请选择活动开始、结束的时间！',
            },
          ]}
        >
          <RangePicker showTime format={dateFormat} />
        </Form.Item>
        <Form.Item
          name={['act', 'signUpDeadline']}
          label="报名截止时间"
          rules={[
            { type: 'object', required: true, message: '请选择报名截止时间！' },
          ]}
        >
          <DatePicker showTime format={dateFormat} />
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
          label="活动标签（标签之间用逗号隔开）"
          rules={[{ required: true }]}
          initialValue={act?.labels ? act?.labels : ''}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['act', 'description']}
          label="活动简介"
          rules={[{ required: true }]}
          initialValue={act?.description ? act?.description : ''}
        >
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
