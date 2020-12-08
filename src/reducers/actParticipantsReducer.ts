import PropertyRequiredError from '@/error/PropertyRequiredError';
import { delVolApi, userVolSignUpApi, volSignUpApi } from '@/Services/activity';
import { listActParticipantsApi, listActVolAppliesApi } from '@/Services/admin';
import { getNotifyApi, getSettingApi } from '@/Services/auth';
import { role, volunteerApplicationState } from '@/Utils/config';
import { message } from 'antd';
const initState = [
  {
    id:0,
    name:'许峰',
    role:role.admin,
    state:volunteerApplicationState.accepted,
    connection:'xff9924@gmail.com'
  }
];
const actParticipantsReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case 'INIT_PARTICIPANTS':
      return action.data;
    case 'DELETE_PARTICIPANT':
      return state.filter((note: object) => note.id !== action.data);
    case 'ADD_PARTICIPANT':
      return [...state, action.data];
    case 'SIGNIN_VOLUNTEER':
      return state.map(p =>
        p.id === action.data
          ? { ...p, state: volunteerApplicationState.accepted }
          : p,
      ); // 申请为志愿者，先put到后端，然后获取相关id，修改前端的state，使用数组map遍历
    case 'DELETE_VOLUNTEER':
      return state.filter(p => p.id !== action.data);
    case 'REJECT_VOLUNTEER':
      return state.map(p =>
        p.id === action.data
          ? { ...p, state: volunteerApplicationState.rejected }
          : p,
      );
    default:
      return state;
  }
};
export const rejectVol = (activityID: number, userID: number) => {
  return async dispatch => {
    try {
      const res = await userVolSignUpApi(
        activityID,
        userID,
        volunteerApplicationState.rejected,
      );
      dispatch({
        type: 'REJECT_VOLUNTEER',
        data: res.data.userID,
      });
      message.success('拒绝成功！');
    } catch (err) {
      if (err.response.status) {
        if (err.response.status === 401) {
          message.error('权限不足！');
        } else if (err.response.status === 404) {
          message.error('活动不存在！');
        } else {
          throw err;
        }
      } else throw err;
    }
  };
};
export const signInVol = (activityID: number, userID: number) => {
  return async dispatch => {
    try {
      const res = await userVolSignUpApi(
        activityID,
        userID,
        volunteerApplicationState.accepted,
      );
      dispatch({
        type: 'SIGNIN_VOLUNTEER',
        data: res.data.userID,
      });
      message.success('报名成功！');
    } catch (err) {
      if (err.response.status) {
        if (err.response.status === 401) {
          message.error('权限不足！');
        } else if (err.response.status === 404) {
          message.error('活动不存在！');
        } else {
          throw err;
        }
      } else throw err;
    }
  };
};
export const delVol = (activityID: number, userID: number) => {
  return async dispatch => {
    try {
      const res = await delVolApi(activityID, userID);
      if(!res?.data?.hasOwnProperty('id')){
        throw new PropertyRequiredError('id');
      }
      dispatch({
        type: 'DELETE_VOLUNTEER',
        data: res.data.id,
      });
      message.success('删除成功！');
    } catch (err) {
      if(err instanceof PropertyRequiredError){
        message.error('Opps!后台数据出错，请联系程序猿');
      }
      else if (err.response.status) {
        if (err.response.status === 401) {
          message.error('权限不足！');
        } else if (err.response.status === 404) {
          message.error('活动不存在！');
        } else {
          throw err;
        }
      } else throw err;
    }
  };
};
export const initParticipants = (
  activityID: number,
  page: number,
  size: number,
) => {
  return async dispatch => {
    try {
      const volRes = await listActParticipantsApi(activityID, page, size); // 获得所有志愿者id
      const volAppliesRes = await listActVolAppliesApi(activityID); // 获得正在申请志愿者的id和状态
      const volApplies = volAppliesRes.data;
      if (!(volRes.data instanceof Array)) {
        throw new PropertyRequiredError('volRes');
      }
      volRes.data.forEach(async (v: object) => {
        // 用forEach把封装好的志愿者信息加到vol里，这里用map直接返回会返回几个promise，很难搞定(其实可以用promise.all搞定)
        const notifyRes = await getNotifyApi(v.id); // 获得通知方式
        const settingRes = await getSettingApi(v.id); // 获得用户名
        const apply = volApplies.find((note: object) => note.userID === v.id); // 找到申请信息
        if (
          !notifyRes?.data?.wechat?.enabled &&
          !notifyRes?.data?.email?.enabled
        )
          throw new PropertyRequiredError('notify');
        if (
          typeof settingRes.data === 'object' &&
          (!settingRes.data.hasOwnProperty('id') ||
            !settingRes.data.hasOwnProperty('detail') ||
            !settingRes.data.hasOwnProperty('role'))
        ) {
          throw new PropertyRequiredError('setting');
        }
        const note = {
          id: settingRes.data.id,
          name: settingRes.data.detail.name,
          role: settingRes.data.role,
          connection: notifyRes.data.wechat.enabled
            ? notifyRes.data.wechat.wxid
            : notifyRes.data.email.address,
          state: apply ? apply.state : volunteerApplicationState.accepted,
          reason: apply ? apply.reason : 'null',
        }; // 封装起来
        console.log(apply);
        dispatch({
          type: 'ADD_PARTICIPANT',
          data: note,
        }); // 发送到store
      });
    } catch (err) {
      if (err instanceof PropertyRequiredError) {
        message.error('后台数据出错！');
      } else if (err?.response?.status) {
        if (err.response.status === 401) {
          message.error('权限不足！');
        } else if (err.response.status === 404) {
          if (err.response.data.code === 'error.generic.not_exists') {
            message.error('用户不存在！');
          } else message.error('活动不存在！');
        } else {
          throw err;
        }
      } else {
        throw err;
      }
    }
  };
};
export default actParticipantsReducer;
