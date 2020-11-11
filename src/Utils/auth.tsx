import React from 'react';

// token管理 分别有get set is？ clear对应登录 页面跳转 退出 等等
// token中的userID

export const getToken = (): any => {

  return window.localStorage.getItem('token');
};

export const setToken = (token: string): any => {
  return window.localStorage.setItem('token', token);
};

export const isLogined = ():boolean => {
    if(getToken()){
        return true
    }
    return false
}
export const clearToken = (): any => {
  return window.localStorage.removeItem('token');
};

export const getUserID = (): any => {
  return window.localStorage.getItem('UserID');
};

export const setUserID = (UserID: string): any => {
  return window.localStorage.setItem('UserID', UserID);
};

export const clearUserID = (): any => {
  return window.localStorage.removeItem('UserID');
};

export const getRoles = (): any => {
  return window.localStorage.getItem('roles');
};

export const setRoles = (roles: string): any => {
  return window.localStorage.setItem('roles', roles);
};

export const clearRoles = (): any => {
  return window.localStorage.removeItem('roles');
};

/*export const isLogined = () => {
  return true;
};*/
export const isadmin = getRoles() !== 'ROLES_USER'?true:false; // 暂时用来区分是否为管理员
