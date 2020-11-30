import { post, get, put } from '../Utils/request';
import { serverUrl } from '../Utils/config';

export const loginApi = (user: object) => {
  return post(`${serverUrl}/account/login`, user); // 返回resolve里的值
};

export const signUpApi = (user: object) => {
  return post(`${serverUrl}/account/accounts`, user);
};

export const getNotifyApi = (userID: number) => {
  return get(`${serverUrl}/notify/methods/`, { userID });
};
export const changeNotifyApi = (
  userID: number,
  wechat: string,
  email: string,
) => {
  const changedNotify = {
    userID,
    wechat: {
      enabled: true,
      wxid: wechat,
    },
    email: {
      enabled: true,
      address: email,
    },
  };
  return put(
    `${serverUrl}/notify/methods/${userID}`,
    { userID },
    changedNotify,
  ); // parameter设置了就会用问号传值，不用重复设置
};

export const changeSettingApi = (userID: number, newSetting: object) => {
  return put(`${serverUrl}/account/accounts/${userID}`, { userID }, newSetting);
}; // url是url,params是params，两个都要看，传参都是string不然会报错

export const getSettingApi = (userID: number) => {
  return get(`${serverUrl}/account/accounts/${userID}`, { userID });
};
