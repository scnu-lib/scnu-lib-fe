import React from 'react';
//token管理 分别有get set is？ clear对应登录 页面跳转 退出 等等
//token中的userID
export const getToken = ():any => {

    return localStorage.getItem('token')
}

export const setToken = (token:string):any =>{
    return localStorage.setItem('token',token)
}

export const isLogined = ():boolean => {
    if(getToken()){
        return true
    }
    return false
}

export const clearToken = ():any =>{
    return localStorage.removeItem('token')
}

export const getUserID = ():any => {

    return localStorage.getItem('UserID')
}

export const setUserID = (UserID:string):any =>{
    return localStorage.setItem('UserID',UserID)
}


export const clearUserID = ():any =>{
    return localStorage.removeItem('UserID')
}

/*export const isLogined = ()=>{
    return true;
}*/
export const isadmin = false //暂时用来区分是否为管理员
