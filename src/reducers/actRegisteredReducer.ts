import PropertyRequiredError from '@/error/PropertyRequiredError';
import { actIsSignUpApi, actSignUpApi } from '@/Services/activity';
import { getUserID } from '@/Utils/auth';
import { message } from 'antd';

const initState:number[] = [];
const actRegisteredReducer = (state:number[] = initState,action:{type:string,data:[]}) => {
    switch(action.type){
        case 'ADD_REGISTERED_ACT':return [...state,action.data];
        case 'CLEAN_REGISTERED_ACT':return state;// 清除所有的已报名活动状态，退出登录时
        case 'INIT_REGISTERED_ACT':return [...action.data];
        default:return state;
    }
}
export const addRegisteredAct=(userID:number,actID:number)=>{
    return async dispatch=>{
        try{
            const resData = (await actSignUpApi(actID,userID)).data;
            dispatch({type:'ADD_REGISTERED_ACT',data:resData.activityID})
        }catch(err){
            message.error('报名失败, 请刷新后重试')
        }
    }
}
export const initActReg= (userID:number,acts:[])=>{
    return async dispatch=>{
    try{
        const regActs:number[] = [];
        console.log(acts)
        acts.forEach(async act=>{
            if((await actIsSignUpApi(act.id,userID)).data)//每个活动查询是否报名
            {
                dispatch(addRegisteredAct(userID,act.id))
            }
        })
        dispatch({
            type: 'INIT_REGISTERED_ACT',
            data: regActs,
          });
    }
    catch(err){
        message.error('Oops! 后台数据出错，请联系程序猿');
    }
 }
}

export default actRegisteredReducer