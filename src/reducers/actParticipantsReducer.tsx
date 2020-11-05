import { volsignupApi } from '@/Services/activity';
import {listactParticipantsApi} from '@/Services/admin'
const initState = [{
    id:0,
    name:'456',
    role:'USER',
    connection:'123456',
    volunteer:true,
}]
const actParticipantsReducer = (state:any = initState,action:any) => {
    switch(action.type){
        case 'INIT_PARTICIPANTS':return action.data;
        case 'DELETE_PARTICIPANT':return state;// 删除参与人员功能，暂时不实现
        case 'SIGNIN_VOLUNTEER':
        return state.map(p =>
            p.id === action.data?{...p,volunteer:!p.volunteer}:p)// 申请为志愿者，先put到后端，然后获取相关id，修改前端的state，使用数组map遍历
        case 'DELETE_VOLUNTEER':
        return state.filter(p => p.id !== action.data)
        default:return state;
    }
}
export const signinvol = (activityID:number,userID:number)=>{
    return async dispatch => {
        try{
            const res = await volsignupApi(activityID,userID)

            dispatch({
                type:'SIGNIN_VOLUNTEER',
                data:res.data.id
            })
        }catch(err){
            console.log(err)
        }
    }
}
export const delvol = (activityID:number,userID:number)=>{
    return async dispatch => {
        try{
            const res = await delvol(activityID,userID)

            dispatch({
                type:'DELETE_VOLUNTEER',
                data:res.data.id
            })
        }catch(err){
            console.log(err)
        }
    }
}
export const initParticipants = (activityID:string,page:number,size:number) => {
    return async dispatch => {
        try{
        const res = await listactParticipantsApi(activityID,page,size)
        dispatch({
            type:'INIT_PARTICIPANTS',
            data:res.data
        })
        }catch(err){
            console.log(err)
        }
    }
}
export default actParticipantsReducer;