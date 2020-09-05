import { loginApi } from '@/Services/auth'

export const changeUserID = (user:object) =>{
    return async (dispatch:any) => {
        const res = await loginApi(user)//post得到token后设置缓存，跳转刷新
        const Payload = decodeURIComponent(escape(window.atob((res.data.jwt).split('.')[1])))
        const UserID = JSON.parse(Payload).name
        console.log(UserID)
        dispatch({
            type:'CREATE',
            data:UserID
        })
    }
}

export const deleteUserID = () => {
    return {
        type:'DELETE'
    }
}