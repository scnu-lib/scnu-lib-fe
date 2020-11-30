import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, message, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './User.css';
import { getUserID } from '@/Utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { initUserInfo } from '../../reducers/userReducer';
import ChangeUser from './ChangeUser';
//User

const User = (props: any) => {
  const [showChange, setShowChange] = useState(false); //显示修改或者是展示模式，由于只涉及到这个组件，暂时用usestate来管理
  const userInfo = useSelector(state => state.user); //store显示
  const dispatch = useDispatch();
  const getAll = (userID: number) => {
    dispatch(initUserInfo(userID));
  };
  useEffect(() => {
    getAll(getUserID());
  }, []); //第一次调用渲染一次，从后端的到初始化数据用dispatch传到store，更新view，有了这个后面的初始化input才不会出bug
  const toggleShow = () => {
    setShowChange(!showChange);
  }; //翻转展示模式
  return (
    <Card className="notify-card" title="修改/保存你的联系方式">
      {showChange ? (
        <ChangeUser toggleshow={toggleShow} />
      ) : (
        <div>
          <Descriptions className="notify-descriptions" column={1}>
            <Descriptions.Item label="微信号">
              {userInfo?.wechat?.wxid}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱地址">
              {userInfo?.email?.address}
            </Descriptions.Item>
          </Descriptions>
          <Button
            onClick={e => {
              toggleShow();
            }}
          >
            修改
          </Button>
        </div>
      )}
    </Card>
  );
};

export default User;
