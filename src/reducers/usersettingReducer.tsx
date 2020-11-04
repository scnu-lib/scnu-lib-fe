import {changesettingApi,getsettingApi} from '@/Services/auth'
const initstate = {
    "id": 0,
    "username": "string",
    "password": "string",
    "detail": {
      "name": "string"
    },
    "role": [
      "ROLE_USER"
    ]
  }

// 存储指定用户的信息，有get和put修改功能
const usersettingReducer = (state:any = initstate,action:any)=>{
    switch(action.type){
        case 'CHANGE_SETTING':return action.data;
        case 'INIT_SETTING':return action.data
        default: return state;
    }
}
export const changeSetting =  (newsetting: object) => {
    return async dispatch => {
        try{
        const res = await changesettingApi(newsetting.id,newsetting)
        dispatch({
            type:'CHANGE_SETTING',
            data:res.data
        })
    }catch(err){
        console.log(err)
    }
}
}
export const initSetting = (userID:string) => {
    return async dispatch => {
        try{
            const res = await getsettingApi(userID)
            dispatch({
                type:'INIT_SETTING',
                data:res.data
            })
        }catch(err){
            console.log(err)
        }
    }
}
export default usersettingReducer