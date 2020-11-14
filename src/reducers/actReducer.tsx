import PropertyRequiredError, { CheckActproperty } from '@/error/PropertyRequiredError'
import { listactApi } from '@/Services/activity'
import { message } from 'antd'
// 活动的reducer，功能有初始化（与后端通信）
const initState = [
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
        console.log(res)
        res.data.map((note:object)=>{CheckActproperty(note)})
        dispatch({
            type:'INIT',
            data:res.data
        })
    }catch(err){
        if(err instanceof PropertyRequiredError)
        {
            message.error('后台数据有误!缺少：'+err.property)
        }
        else{
        message.error('请求失败，请稍后重试！')
        }
    }
    }
}
export default actReducer