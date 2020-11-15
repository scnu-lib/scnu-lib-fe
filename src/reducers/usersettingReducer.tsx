import PropertyRequiredError from '@/error/PropertyRequiredError';
import {changesettingApi,getsettingApi} from '@/Services/auth'
import { message } from 'antd';
const initstate = {
    "id": 0,
    "username": "string",
    "password": "string",
    "detail": {
      "name": "string"
    },
    "role": [
      "ROLE_USER"
    ]
  }

// 存储指定用户的信息，有get和put修改功能
const usersettingReducer = (state:any = initstate,action:any)=>{
    switch(action.type){
        case 'CHANGE_SETTING':return action.data;
        case 'INIT_SETTING':return action.data
        default: return state;
    }
}
export const changeSetting =  (newsetting: object) => {
    return async dispatch => {
        try{
        const res = await changesettingApi(newsetting.id,newsetting)
        if(!res?.data?.hasOwnProperty('id')||!res?.data?.hasOwnProperty('username')||!res?.data?.hasOwnProperty('password')||!res?.data?.hasOwnProperty('detail')||!res?.data?.hasOwnProperty('role'))
            {
                throw new PropertyRequiredError('res');
            }
        dispatch({
            type:'CHANGE_SETTING',
            data:res.data
        })
    }catch(err){
        if(err instanceof PropertyRequiredError){
            message.error('后台数据错误！')
        }
        else{
        if(err?.response?.status === 404){
            message.error('用户不存在！');
        }else if(err?.response?.status === 403){
            message.error('没有权限！');
        }
        else{
            throw err;
        }
    }
    }
}
}
export const initSetting = (userID:number) => {
    return async dispatch => {
        try{
            const res = await getsettingApi(userID)
            if(!res?.data?.hasOwnProperty('id')||!res?.data?.hasOwnProperty('username')||!res?.data?.hasOwnProperty('password')||!res?.data?.hasOwnProperty('detail')||!res?.data?.hasOwnProperty('role'))
            {
                throw new PropertyRequiredError('res');
            }
            dispatch({
                type:'INIT_SETTING',
                data:res.data
            })
        }catch(err){
            if(err instanceof PropertyRequiredError){
                message.error('后台数据错误！')
            }
            else{
            if(err?.response?.status === 404){
                message.error('用户不存在！');
            }else if(err?.response?.status === 403){
                message.error('没有权限！');
            }
            else{
                throw err;
            }
        }
        }
    }
}
export default usersettingReducer