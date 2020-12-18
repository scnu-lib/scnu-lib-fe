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
  const roles = window.localStorage.getItem('role')?.split(',');
  if (roles?.find(r => r === role.admin)) return role.admin;
  else if (roles?.find(r => r === role.librarian)) return role.librarian;
  else return role.user;
  //这里后端传来的不止一个角色，但是只要知道用户的最高权限就行了，把数组转换为单个角色
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
