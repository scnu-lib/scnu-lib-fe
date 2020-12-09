// 活动列表页有很多标签之类的状态，直接做成一个state比较方便。

import { actLabel } from "@/Utils/config";
export enum registeredState {
    all = 'all',
    registeredOnly = 'registeredOnly'
}
const initState = {
    registered:registeredState.all,// 只显示已报名
    label:actLabel.all, // 显示的标签
    drawer:false // 抽屉显示状态
}

const actListShowReducer = (state:object = initState,action:object) => {
    switch(action.type){
        case 'CHANGE_REGISTERED':return {...state,registered:action.data};
        case 'CHANGE_LABEL':return {...state,label:action.data};
        case 'CHANGE_DRAWER':return {...state,drawer:!state.drawer};
        case 'INIT_ACT_LIST_SHOW':return {
            registered:registeredState.all,
            label:actLabel.all,
            drawer:false
         };
        default:return state;
    }
}

export const initActShow = () =>{
    return {
        type:'INIT_ACT_LIST_SHOW'
    }
}
export const changeDrawer = () =>{
    return {
        type:'CHANGE_DRAWER'
    }
}
export const changeRegistered = (registered:registeredState) =>{
    return {
        type:'CHANGE_REGISTERED',
        data:registered
    }
}
export const changeLabel = (label:actLabel) => {
    return {
        type:'CHANGE_LABEL',
        data:label
    }
}
export default actListShowReducer;