import { detailApi,changeactApi,createactApi } from '@/Services/activity';

const initState = {"id": 0,
"title": "阅读马拉松",
"startTime": "2020-08-27",
"content":'111',
"endTime": "2020-08-27",
"signUpDeadline": "2020-08-27",
"maxParticipant": 40,
"currentParticipant": 3,
"location": "图书馆（石牌）",
"issign":true,
"src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
"labels": [
  "string"
]}
const actDetailReducer = (state:any = initState,action:object) => {
    switch(action.type){
        case 'INIT_ACTIVITY':return action.data;
        case 'CHANGE_ACTIVITY':return action.data;
        default:return state;
    }
}

export const initActDetail = (activityID:number) => {
    return async dispatch => {
        try{
            const res = await detailApi(activityID)
            dispatch({
                type:'INIT_ACTIVITY',
                data:res.data
            })
        }catch(err){
            console.log(err)
        }
    }
}

export default actDetailReducer