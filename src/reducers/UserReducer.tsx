const userReducer = (state:object = {wechat:{wxid:'123'},email:{address:'123@qq.com'}},action:object) => {
    switch(action.type){
        case 'CHANGE_USERINFO':return action.data
        default:return state
    }
}//把notify用redux记录，先写一个可以修改notify的reducer

export const changeUserinfo = (wxid:string,address:string) => {
    return {
        type:'CHANGE_USERINFO',
        data:{
            wechat:{wxid:wxid},email:{address:address}
        }
    }
}//actioncreator 输入新的notify返回一个action
export default userReducer