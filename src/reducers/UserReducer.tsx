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
        console.log(res)
        dispatch({
        type:'CHANGE_USERINFO',
        data: res.data
    })
    }
    catch(err){
        console.log(err)
    }
    }

    
}//actioncreator 输入新的notify返回一个action 改为异步写法，把与后端通信功能加到actioncreator里面
export const initUserinfo = (userID:string) => {
    return async dispatch => {
        try{
            const res = await getnotifyApi(userID)
            dispatch({
                type:'INIT_USERINFO',
                data:res.data
            })
        }catch(err){
            console.log(err)
        }
    }
}
export default userReducer