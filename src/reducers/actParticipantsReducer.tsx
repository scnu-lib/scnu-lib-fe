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
        default:return state;
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