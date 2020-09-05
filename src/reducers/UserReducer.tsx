const UserReducer = (state:any = '',action:object) => {
    switch(action.type){
        case 'CREATE':return action.data
        case 'DELETE':return ''
        default:return state
    }
}//存放从后端拿到的user的信息，目前只有USERID

export default UserReducer