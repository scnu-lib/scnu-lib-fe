import React from 'react';
import { role } from './config';

// token管理 分别有get set is？ clear对应登录 页面跳转 退出 等等
// token中的userID

export const getToken = (): any => {
  return window.localStorage.getItem('token');
};

export const setToken = (token: string): any => {
  return window.localStorage.setItem('token', token);
};

export const isLogined = (): boolean => {
  if (getToken()) {
    return true;
  }
  return false;
};
export const clearToken = (): any => {
  return window.localStorage.removeItem('token');
};

export const getUserID = (): number => {
  return Number(window.localStorage.getItem('userID'));
};

export const setUserID = (userID: number): any => {
  return window.localStorage.setItem('userID', String(userID));
};

export const clearUserID = (): any => {
  return window.localStorage.removeItem('userID');
};

export const getRole = (): role => {
  switch (window.localStorage.getItem('role')) {
    case 'ROLE_USER':
      return role.user;
    case 'ROLE_ADMIN':
      return role.admin;
    case 'ROLE_LIBRARIAN':
      return role.librarian;
    default:
      return role.user;
  }
};

export const setRole = (role: role): any => {
  return window.localStorage.setItem('role', role);
};

export const clearRole = (): any => {
  return window.localStorage.removeItem('role');
};

/*export const isLogined = () => {
  return true;
};*/
// export const isadmin = getRoles() !== 'ROLES_USER'?true:false; // 暂时用来区分是否为管理员
