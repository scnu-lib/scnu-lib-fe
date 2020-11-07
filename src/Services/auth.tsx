import { post,get,put } from '../Utils/request'
import { serverUrl } from '../Utils/config'

export const loginApi = (user:object) => {
    return post(`${serverUrl}/account/login`,user)// 返回resolve里的值
}

export const signupApi = (user:object) => {
    return post(`${serverUrl}/account/accounts`,user)
}

export const getnotifyApi = (userID:string) => {
    return get(`${serverUrl}/notify/methods/`,{userID})
}
export const changenotifyApi = (userID:string,wechat:string,email:string) => {
    const changednotify = {
        userID,
        wechat:{
            enabled:true,
            wxid:wechat
        },email:{
            enabled:true,
            address:email
        }
    }
    return put(`${serverUrl}/notify/methods/${userID}`,{userID},changednotify)// parameter设置了就会用问号传值，不用重复设置
}

export const changesettingApi = (userID:string,newsetting:object) => {
    return put(`${serverUrl}/account/accounts/${userID}`,{userID},newsetting)
}// url是url,params是params，两个都要看，传参都是string不然会报错

export const getsettingApi = (userID:string) => {
    return get(`${serverUrl}/account/accounts/${userID}`,{userID})
}