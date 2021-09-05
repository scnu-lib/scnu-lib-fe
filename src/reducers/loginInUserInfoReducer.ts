import PropertyRequiredError from '@/error/PropertyRequiredError';
import { changeNotifyApi } from '@/Services/auth';
import { getUserID } from '@/Utils/auth';
import { message } from 'antd';

const loginInUserReducer = (
  state: object = {
    userID: 0,
    wechat: { enabled: true, wxid: '' },
    email: { enabled: true, address: '' },
  },
  action: object,
) => {
  switch (action.type) {
    case 'CHANGE_USERINFO':
      return action.data;
    case 'INIT_USERINFO':
      return action.data;
    case 'CLEAN_USERINFO':
      return {
        userID: 0,
        wechat: { enabled: true, wxid: '' },
        email: { enabled: true, address: '' },
      };
    default:
      return state;
  }
};

export const cleanLoginInUserInfo = () => {
  return {
    type: 'CLEAN_USERINFO',
  };
};
export const changeLoginInUserInfo = (
  wxid: string,
  address: string,
  userid: number = getUserID(),
) => {
  return async dispatch => {
    try {
      const setRes = await changeNotifyApi(userid, wxid, address);
      dispatch({
        type: 'CHANGE_USERINFO',
        data: { /*...res.data,*/ ...setRes.data },
      });
      // message.success('保存成功！');
    } catch (err) {
      if (err instanceof PropertyRequiredError) {
        message.error('后台数据错误！');
      } else if (err?.response?.status === 404) {
        message.error('用户不存在！');
      } else if (err?.response?.status === 401) {
        message.error('没有权限！');
      } else {
        throw err;
      }
    }
  };
}; // actioncreator 输入新的notify返回一个action 改为异步写法，把与后端通信功能加到actioncreator里面

export const initLoginInUserInfo = (data: object) => {
  return {
    type: 'INIT_USERINFO',
    data,
  };
};
export default loginInUserReducer;
