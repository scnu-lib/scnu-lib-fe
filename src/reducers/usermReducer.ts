// 用户管理reducer
import PropertyRequiredError from '@/error/PropertyRequiredError';
import { listUserApi } from '@/Services/admin';
import { message } from 'antd';
import userReducer from './userReducer';
const usermReducer = (
  state = [
    {
      id: 0,
      username: 'string',
      role: 'ROLE_LIBRARIAN',
    },
  ],
  action: object,
) => {
  switch (action.type) {
    case 'INIT_USER':
      return [...action.data];
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

      dispatch({
        type: 'INIT_USER',
        data: res.data,
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
export default usermReducer;
