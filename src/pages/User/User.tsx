import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, message, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './User.css';
import { getUserID } from '@/Utils/auth';
import { useDispatch } from 'react-redux';
import ChangeUser from './ChangeUser';
import { getNotifyApi } from '@/Services/auth';
import { initLoginInUserInfo } from '@/reducers/loginInUserInfoReducer';
//User

const User = (props: any) => {
  const dispatch = useDispatch();
  const getAll = (userID: number) => {
          getNotifyApi(getUserID()).then(res=>{
            dispatch(initLoginInUserInfo(res.data));
          }).catch(err=>{
            message.error('Oops!发生了未知的错误');
          })
  };
  useEffect(() => {
    getAll(getUserID());
  }, []); //第一次调用渲染一次，从后端的到初始化数据用dispatch传到store，更新view，有了这个后面的初始化input才不会出bug
  return (
    <Card className="notify-card" title="修改/保存你的联系方式">
      <ChangeUser />
    </Card>
  );
};

export default User;
