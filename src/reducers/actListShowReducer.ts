// 活动列表页有很多标签之类的状态，直接做成一个state比较方便。

import { actLabel } from "@/Utils/config";

const initState = {
    registered:false,// 只显示已报名
    label:actLabel.all // 显示的标签
}

const actListShowReducer = (state:object = initState,action:object) => {
    switch(action.type){
        case 'CHANGE_REGISTERED':return {...state,registered:!state.registered};
        case 'CHANGE_LABEL':return {...state,label:action.data};
        case 'INIT_ACT_LIST_SHOW':return {
            registered:false,
            label:actLabel.all };
        default:return state;
    }
}

export const initActShow = () =>{
    return {
        type:'INIT_ACT_LIST_SHOW'
    }
}

export const changeRegistered = () =>{
    return {
        type:'CHANGE_REGISTERED'
    }
}
export const changeLabel = (label:actLabel) => {
    return {
        type:'CHANGE_LABEL',
        data:label
    }
}
export default actListShowReducer;