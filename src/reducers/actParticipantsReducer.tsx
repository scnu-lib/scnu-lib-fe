import PropertyRequiredError from '@/error/PropertyRequiredError';
import { delvolApi, uservolsignupApi, volsignupApi } from '@/Services/activity';
import {listactParticipantsApi,listactvolappliesApi} from '@/Services/admin'
import {getnotifyApi,getsettingApi} from '@/Services/auth'
import { VolunteerApplicationState } from '@/Utils/config';
import {message} from 'antd'
const initState = []
const actParticipantsReducer = (state:any = initState,action:any) => {
    switch(action.type){
        case 'INIT_PARTICIPANTS':return action.data;
        case 'DELETE_PARTICIPANT':return state.filter((note:object)=> note.id !== action.data);
        case 'ADD_PARTICIPANT':return [...state,action.data]
        case 'SIGNIN_VOLUNTEER':
        return state.map(p =>
            p.id === action.data?{...p,state:VolunteerApplicationState.accepted}:p)// 申请为志愿者，先put到后端，然后获取相关id，修改前端的state，使用数组map遍历
        case 'DELETE_VOLUNTEER':
        return state.filter(p => p.id !== action.data)
        case 'REJECT_VOLUNTEER':
        return state.map(p=>p.id === action.data?{...p,state:VolunteerApplicationState.rejected}:p)
        default:return state;
    }
}
export const rejectvol = (activityID:number,userID:number)=>{
    return async dispatch => {
        try{
            const res = await uservolsignupApi(activityID,userID,VolunteerApplicationState.rejected)
            dispatch({
                type:'REJECT_VOLUNTEER',
                data:res.data.userID

            }
            )
            message.success('拒绝成功！')
        }catch(err){

            if(err.response.status){
            if(err.response.status === 401){
                message.error('权限不足！')
            }else if(err.response.status === 404){
                message.error('活动不存在！')
            }else{
                throw err;
            }}else
                throw err;

        }
    }
}
export const signinvol = (activityID:number,userID:number)=>{
    return async dispatch => {
        try{
            const res = await uservolsignupApi(activityID,userID,VolunteerApplicationState.accepted)
            dispatch({
                type:'SIGNIN_VOLUNTEER',
                data:res.data.userID
            })
            message.success('报名成功！')
        }catch(err){
            if(err.response.status){
            if(err.response.status === 401){
                message.error('权限不足！')
            }else if(err.response.status === 404){
                message.error('活动不存在！')
            }else{
                throw err;
            }}else
                throw err;
        }

    }
}
export const delvol = (activityID:number,userID:number)=>{
    return async dispatch => {
        try{
            const res = await delvolApi(activityID,userID)
            dispatch({
                type:'DELETE_VOLUNTEER',
                data:res.data.id
            })
            message.success('删除成功！')
        }catch(err){
            if(err.response.status){
            if(err.response.status === 401){
                message.error('权限不足！')
            }else if(err.response.status === 404){
                message.error('活动不存在！')
            }else{
                throw err;
            }}else
                throw err;
        }
    }
}
export const initParticipants = (activityID:number,page:number,size:number) => {
    return async dispatch => {
        try{
        const volres = await listactParticipantsApi(activityID,page,size)// 获得所有志愿者id
        const volappliesres = await listactvolappliesApi(activityID)// 获得正在申请志愿者的id和状态
        const volapplies = volappliesres.data
        if(!(volres.data instanceof Array)){
            throw new PropertyRequiredError('volres')
        }
        volres.data.forEach(async (v:object)=>{// 用forEach把封装好的志愿者信息加到vol里，这里用map直接返回会返回几个promise，很难搞定
            const notifyres = await getnotifyApi(v.id)// 获得通知方式
            const settingres = await getsettingApi(v.id)// 获得用户名
            const apply = volapplies.find((note:object)=>note.userID === v.id)// 找到申请信息
            if(!notifyres?.data?.wechat?.enabled&&!notifyres?.data?.email?.enabled)throw new PropertyRequiredError('notify');
            if(typeof settingres.data === 'object'&&(!settingres.data.hasOwnProperty('id')||!settingres.data.hasOwnProperty('detail')||!settingres.data.hasOwnProperty('role')))
            {
                throw new PropertyRequiredError('setting');
            }
            const note =  {
                id:settingres.data.id,
                name:settingres.data.detail.name,
                role:settingres.data.role,
                connection:notifyres.data.wechat.enabled?notifyres.data.wechat.wxid:notifyres.data.email.address,
                state:apply?apply.state:VolunteerApplicationState.accepted,
                reason:apply?apply.reason:'null',
            }// 封装起来
            console.log(apply)
            dispatch({
                type:'ADD_PARTICIPANT',
                data:note
            })// 发送到store
        })

        }catch(err){
            if(err instanceof PropertyRequiredError){
                message.error('后台数据出错！')
            }
            else if(err?.response?.status){
            if(err.response.status === 401){
                message.error('权限不足！')
            }else if(err.response.status === 404){
                if(err.response.data.code === 'error.generic.not_exists'){
                    message.error('用户不存在！')
                }else
                    message.error('活动不存在！')
            }else{
                throw err;
            }
        }else{
            throw err;
        }
        }
    }
}
export default actParticipantsReducer;