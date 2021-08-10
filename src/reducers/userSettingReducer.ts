import PropertyRequiredError from '../error/PropertyRequiredError';
import { changeSettingApi } from '../Services/auth';
import { message } from 'antd';
const initstate = {};

// 存储指定用户的信息，有get和put修改功能
const userSettingReducer = (state: any = initstate, action: any) => {
  switch (action.type) {
    case 'CHANGE_SETTING':
      return action.data;
    case 'INIT_SETTING':
      return action.data;
    case 'CLEAN_SETTING':
      return {};
    default:
      return state;
  }
};
export const changeSetting = (newSetting: object) => {
  return async dispatch => {
    try {
      const res = await changeSettingApi(newSetting.id, newSetting);
      if (
        !res?.data?.hasOwnProperty('id') ||
        !res?.data?.hasOwnProperty('username') ||
        !res?.data?.hasOwnProperty('password') ||
        !res?.data?.hasOwnProperty('detail') ||
        !res?.data?.hasOwnProperty('role')
      ) {
        throw new PropertyRequiredError('res');
      }
      dispatch({
        type: 'CHANGE_SETTING',
        data: res.data,
      });
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
};
export const initSetting = (data: object) => {
  return {
    type: 'INIT_SETTING',
    data,
  };
};
export default userSettingReducer;
