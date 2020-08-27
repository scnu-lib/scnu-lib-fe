import { post } from '../Utils/request'
import { serverUrl } from '../Utils/config'

export const loginApi = (user:object) => {
    return post(`${serverUrl}/account/login`,user)//返回resolve里的值
}

export const signupApi = (user:object) => {
    return post(`${serverUrl}/account/accounts`,user)
}
