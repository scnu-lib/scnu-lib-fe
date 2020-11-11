import { listactApi } from '@/Services/activity'
import { message } from 'antd'
// 活动的reducer，功能有初始化（与后端通信）
const initState = [
    {"id": 0,
    "title": "阅读马拉松",
    "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    "startTime": "2020-08-27",
    "endTime": "2020-08-27",
    "signUpDeadline": "2020-08-27",
    "maxParticipant": 40,
    "currentParticipant": 3,
    "location": "图书馆（石牌）",
    "labels": [
      "string"
    ]},
]
const actReducer = (state = initState,action:object) => {
    switch(action.type){
        case 'INIT':return [...action.data]
        default:return state
    }
}
export const initList = (label:string,page:number = 0,size:number = 20) =>{
    return async dispatch =>{
        try{
        const res = await listactApi(label,page,size)
        dispatch({
            type:'INIT',
            data:res.data
        })
    }catch(err){
        message.error('请求失败，请稍后重试！')
    }
    }
}
export default actReducer