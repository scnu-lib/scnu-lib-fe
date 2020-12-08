import PropertyRequiredError from '@/error/PropertyRequiredError';
import { actIsSignUpApi } from '@/Services/activity';
import { getUserID } from '@/Utils/auth';
import { message } from 'antd';

const initState:[] = [];
const actRegisteredReducer = (state:[] = initState,action:object) => {
    switch(action.type){
        case 'ADD_REGISTERED_ACT':return [...state,action.data];
        case 'CLEAN_REGISTERED_ACT':return state;// 清除所有的已报名活动状态，暂时不需要
        default:return state;
    }
}
export const addSingleRegisteredAct = (activity:object) => {
    return {
        type:'ADD_REGISTERED_ACT',
        data:activity
    }
}
export const addRegisteredAct = (allActivity:object[]) => {
    return async (dispatch:Function) => {
        try{

        allActivity.forEach(async(act:object)=>{
           // 尝试用Promise.all，但是因为这个是会筛选的，也就是数组前后有变化，所以用promise.all会有问题
            const res = await actIsSignUpApi(act.id,getUserID())// 后端的api直接返回了一个true，这里用mock好像做不到，先改成data.data
            const resdata = res.data
            console.log(resdata.data)
            if(!resdata?.hasOwnProperty('data')){
                throw new PropertyRequiredError('data');
            }
            if(resdata.data)
            {
                dispatch({
                    type:'ADD_REGISTERED_ACT',
                    data:act
                })
            }
        })



        }catch(err){
            if(err instanceof PropertyRequiredError){
                message.error('Oops!后台数据出错，请联系程序猿');
            }else if(err.response.status === '404'){
                message.error('活动不存在');
            }
        }
    }
}

export default actRegisteredReducer