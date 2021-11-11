import { post, get, put } from '../Utils/request';
import { serverUrl } from '../Utils/config';

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  credentials: imgCredentials;
  startTime: number;
  expiredTime: number;
}

export interface imgCredentials {
  sessionToken: string;
  tmpSecretId: string;
  tmpSecretKey: string;
}
//获取临时密钥的api
export const getImgCredentials = (): Promise<ServerResponse> => {
  return get(`http://localhost:3000/sts`, {});
};

export const loginApi = (user: object) => {
  return post(`${serverUrl}/account/login`, user); // 返回resolve里的值
};

export const signUpApi = (user: object) => {
  return post(`${serverUrl}/account/accounts`, user);
};

export const getNotifyApi = (userID: number) => {
  return get(`${serverUrl}/notify/methods/${userID}`, { userID });
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
  return put(`${serverUrl}/notify/methods/${userID}`, changedNotify); // parameter设置了就会用问号传值，不用重复设置
};

export const changeSettingApi = (userID: number, newSetting: object) => {
  console.log(userID, newSetting);
  return put(`${serverUrl}/account/accounts/${userID}`, newSetting);
}; // url是url,params是params，两个都要看，传参都是string不然会报错

export const getSettingApi = (userID: number) => {
  return get(`${serverUrl}/account/accounts/${userID}`, { undefined });
};

export const getNextAvailableIDApi = () => {
  return get(`${serverUrl}/account/accounts/userID`, { undefined });
};
