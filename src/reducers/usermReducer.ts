// 用户管理reducer
import PropertyRequiredError from '../error/PropertyRequiredError';
import { listUserApi } from '../Services/admin';
import { getNotifyApi, getSettingApi } from '../Services/auth';
import { message } from 'antd';
const usermReducer = (state = [], action: object) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.data];
    case 'CLEAN_USER':
      return [];
    default:
      return [...state];
  }
};
export const initUserList = (size: number = 20) => {
  return async dispatch => {
    try {
      const res = await listUserApi(size);
      console.log(res);
      if (Array.isArray(res?.data)) {
        res?.data.map(user => {
          if (!user?.hasOwnProperty('id')) {
            throw new PropertyRequiredError('id');
          }
          if (!user?.hasOwnProperty('username')) {
            throw new PropertyRequiredError('username');
          }
          if (!user?.hasOwnProperty('role')) {
            throw new PropertyRequiredError('role');
          }
        });
      } else {
        if (!res?.data?.hasOwnProperty('id')) {
          throw new PropertyRequiredError('id');
        }
        if (!res?.data?.hasOwnProperty('username')) {
          throw new PropertyRequiredError('username');
        }
        if (!res?.data?.hasOwnProperty('role')) {
          throw new PropertyRequiredError('role');
        }
      }
      res.data.map(async user => {
        const Data = (await getSettingApi(user.id)).data;
        const notifyRes = await getNotifyApi(user.id); // 获得通知方式
        const handledDetail = {
          id: Data.id,
          name: Data.detail.name,
          role: Data.role,
          college: Data?.detail?.college || '暂无',
          studentId: Data?.detail?.studentId || '暂无',
          connection:
            (notifyRes.data.wechat?.enabled
              ? notifyRes.data.wechat?.wxid
              : notifyRes.data.email?.address) || '暂无',
        };

        dispatch({
          type: 'ADD_USER',
          data: handledDetail,
        });
      });
    } catch (err) {
      console.log(err);
      if (err instanceof PropertyRequiredError) {
        message.error('后台数据缺少: ' + err.property);
      } else {
        if (err?.response?.status === 401) {
          if (err?.response?.data?.code === 'error.generic.no_permission') {
            message.error('权限不足！');
          } else {
            message.error('请登录！');
          }
        } else {
          throw err;
        }
      }
    }
  };
};
export const cleanUser = () => {
  return {
    type: 'CLEAN_USER',
  };
};
export default usermReducer;
