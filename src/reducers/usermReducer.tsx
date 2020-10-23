//用户管理reducer
import {listuserApi} from '@/Services/admin'
import userReducer from './userReducer';
const usermReducer = (state = [],action:object) =>{
    switch(action.type){
        case 'INIT_USER':return [...action.data];
        default:return [...state];
    }
}

export const initUserlist = (page:number = 0,size:number = 20)=>{
    return async dispatch =>{
        try{
        const res = await listuserApi(page,size)
        console.log(res)
        dispatch({
            type:'INIT_USER',
            data:res.data
        })}catch(err){
            console.log(err)
        }
    }
}
export default usermReducer