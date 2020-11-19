import PropertyRequiredError, {
  CheckActproperty,
} from '@/error/PropertyRequiredError';
import { detailApi, changeactApi, createactApi } from '@/Services/activity';
import { message } from 'antd';

const initState = {
  id: 0,
  title: '阅读马拉松',
  startTime: '2020-08-27',
  content: '111',
  endTime: '2020-08-27',
  signUpDeadline: '2020-08-27',
  maxParticipant: 40,
  currentParticipant: 3,
  location: '图书馆（石牌）',
  issign: true,
  src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
  labels: ['string'],
};
const actDetailReducer = (state: any = initState, action: object) => {
  switch (action.type) {
    case 'INIT_ACTIVITY':
      return action.data;
    case 'CHANGE_ACTIVITY':
      return action.data;
    default:
      return state;
  }
};

export const initActDetail = (activityID: number) => {
  return async dispatch => {
    try {
      const res = await detailApi(activityID);
      CheckActproperty(res.data);
      dispatch({
        type: 'INIT_ACTIVITY',
        data: res.data,
      });
    } catch (err) {
      if (err instanceof PropertyRequiredError) {
        message.error('后台信息格式错误!');
      } else if (err?.response?.status) {
        if (err.response.status === 401) {
          message.error('无访问权限！');
        } else if (err.response.data.code === 'error.generic.not_exists') {
          message.error('活动不存在！');
        } else throw err;
      } else throw err;
    }
  };
};

export default actDetailReducer;
