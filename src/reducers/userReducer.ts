import PropertyRequiredError from '@/error/PropertyRequiredError';
import { message } from 'antd';
import { changeNotifyApi, getNotifyApi, getSettingApi } from '../Services/auth';
import { getUserID } from '../Utils/auth';
const userReducer = (
  state: object = {
    userID: 0,
    wechat: { enabled: true, wxid: '123' },
    email: { enabled: true, address: '123@qq.com' },
    username: '',
    password: '',
    name: '',
    role: '',
  },
  action: object,
) => {
  switch (action.type) {
    case 'CHANGE_USERINFO':
      return action.data;
    case 'INIT_USERINFO':
      return action.data;
    default:
      return state;
  }
}; // 把notify用redux记录，先写一个可以修改notify的reducer

export const changeUserInfo = (
  wxid: string,
  address: string,
  userid: number = -1,
  username: string,
  password: string,
  name: string,
  role: string,
) => {
  return async dispatch => {
    try {
      /*const res = await changeNotifyApi(
        userid !== -1 ? userid : getUserID(),
        wxid,
        address,
      );
      if (
        !res?.hasOwnProperty('userID') ||
        !res?.hasOwnProperty('wechat') ||
        !res?.hasOwnProperty('email')
      ) {
        throw new PropertyRequiredError('res');
      }*/
      const setRes = await getSettingApi(getUserID());
      if (
        !setRes?.hasOwnProperty('id') ||
        !setRes?.hasOwnProperty('username') ||
        !setRes?.hasOwnProperty('detail') ||
        !setRes?.hasOwnProperty('role')
      ) {
        console.log('444');
        throw new PropertyRequiredError('setRes');
      }
      dispatch({
        type: 'CHANGE_USERINFO',
        data: { /*...res.data,*/ ...setRes.data },
      });
      message.success('保存成功！');
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

export const initUserInfo = (userID: number) => {
  return async dispatch => {
    try {
      /*const res = await getNotifyApi(userID);
      console.log(res.data);
      if (
        !res?.hasOwnProperty('userID') ||
        !res?.hasOwnProperty('wechat') ||
        !res?.hasOwnProperty('email')
      ) {
        throw new PropertyRequiredError('res');
      }*/
      const setRes = await getSettingApi(userID);
      console.log(setRes.data);
      console.log('2222');
      if (
        !setRes.data?.hasOwnProperty('id') ||
        !setRes.data?.hasOwnProperty('username') ||
        !setRes.data?.hasOwnProperty('detail') ||
        !setRes.data?.hasOwnProperty('role')
      ) {
        throw new PropertyRequiredError('setRes');
      }
      console.log(setRes.data);
      dispatch({
        type: 'INIT_USERINFO',
        data: { /*...res.data,*/ ...setRes.data },
      });
      console.log('222');
    } catch (err) {
      if (err instanceof PropertyRequiredError) {
        message.error('后台数据错误！');
      } else if (err?.response?.status === 404) {
        message.error('用户不存在');
      } else if (err?.response?.status === 401) {
        message.error('没有权限！');
      } else {
        throw err;
      }
    }
  };
};
export default userReducer;
