import PropertyRequiredError from '@/error/PropertyRequiredError'
import { message } from 'antd'
import {changenotifyApi,getnotifyApi} from '../Services/auth'
import {getUserID} from '../Utils/auth'
const userReducer = (state:object = {userID:0,wechat:{enabled:true,wxid:'123'},email:{enabled:true,address:'123@qq.com'}},action:object) => {
    switch(action.type){
        case 'CHANGE_USERINFO':return action.data
        case 'INIT_USERINFO': return action.data
        default:return state
    }
}//把notify用redux记录，先写一个可以修改notify的reducer

export const changeUserinfo =  (wxid:string,address:string,userid:string = '') => {
    return async dispatch => {
        try{
        const res = await changenotifyApi(userid?userid:getUserID(),wxid,address)
        dispatch({
        type:'CHANGE_USERINFO',
        data: res.data
    })
    }
    catch(err){
        if(err?.response?.status === 404){
            message.error('用户不存在！');
        }else if(err?.response?.status === 401){
            message.error('没有权限！');
        }
        else{
            throw err;
        }
    }

}
}//actioncreator 输入新的notify返回一个action 改为异步写法，把与后端通信功能加到actioncreator里面

export const initUserinfo = (userID:number) => {
    return dispatch =>{
        try{
            const res = getnotifyApi(String(userID))
            if(!res?.userID||!res?.wechat||!res?.email){
                throw new PropertyRequiredError('res')
            }
            dispatch({
                type:'INIT_USERINFO',
                data:res.data
            })
        }catch(err){
            if(err instanceof PropertyRequiredError){
                message.error('后台数据错误！');
            }
            else if(err?.response?.status === 404){
                message.error('用户不存在')
            }
            else if(err?.response?.status === 401){
                message.error('没有权限！')
            }
            else{
                throw err;
            }
        }
    } 
}
export default userReducer