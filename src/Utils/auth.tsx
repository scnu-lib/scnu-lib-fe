import React from 'react';
import { Roles } from './config';

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

export const getUserID = (): number => {
  return Number(window.localStorage.getItem('UserID'));
};

export const setUserID = (UserID: number): any => {
  return window.localStorage.setItem('UserID', String(UserID));
};

export const clearUserID = (): any => {
  return window.localStorage.removeItem('UserID');
};

export const getRoles = (): Roles => {
  switch(window.localStorage.getItem('roles'))
  {
    case 'ROLE_USER':return Roles.user;
    case 'ROLE_ADMIN':return Roles.admin;
    case 'ROLE_LIBRARIAN':return Roles.librarian;
    default:return Roles.user;
  }

};

export const setRoles = (roles: Roles): any => {
  return window.localStorage.setItem('roles', roles);
};

export const clearRoles = (): any => {
  return window.localStorage.removeItem('roles');
};

/*export const isLogined = () => {
  return true;
};*/
// export const isadmin = getRoles() !== 'ROLES_USER'?true:false; // 暂时用来区分是否为管理员
