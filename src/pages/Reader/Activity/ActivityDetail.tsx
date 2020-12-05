import React, { useEffect, useState} from 'react';
import { Card, Button, message,Modal } from 'antd';
import { initActDetail } from '@/reducers/actDetailReducer';
import Labels from './Labels'
import {
  detailApi,
  actSignUpApi,
  volSignUpApi,
  userVolSignUpApi,
} from '@/Services/activity';
import './ActivityDetail.css';
import { getUserID, isLogined } from '@/Utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import { volunteerApplicationState } from '@/Utils/config';
import { models } from '@/.umi/plugin-model/Provider';
//活动页
function ActivityDetail(props: any) {
  //活动详情页，做成对话框形式，把所有活动信息列出来，加上报名志愿者和报名活动的按钮
  const [isSigned, setIsSigned] = useState(false);
  
 
  const handleSignUpAct = (activityID:number,id: number) => { //活动报名申请
    actSignUpApi(activityID, id)
      .then(res => {
        message.success('报名成功！');
        setIsSigned(true);
      })
      .catch(err => console.log(err));
  };
  const handleVolSignUp = async (acitivityID: number, userID: number) => {
    //志愿者报名申请，目前需要一个接口可以查询志愿者的状态
    try {
      const res = await userVolSignUpApi(
        acitivityID,
        userID,
        volunteerApplicationState.applied,
      );
      message.success('报名成功！');
    } catch (err) {
      console.log(err);
    }
  };
  return(  <Modal 
    className='actDetail-modal'
    title={props.modalDetail?.title}
    visible={props.isDetailsVisible}
    onOk={props.handleOk}
    onCancel={props.handleCancel}
    footer={null}
    width={550}
> 
    <div  className={`img${props.modalDetail?.id}`} ></div>
    
    <div className='actDetail-details'>  
     <p>
          报名截止于: {props.modalDetail?.signUpDeadline?.slice(5)} 活动日期：{props.modalDetail?.startTime?.slice(5)}~{props.modalDetail?.endTime?.slice(5)} {props.modalDetail?.currentParticipant}/
      {props.modalDetail?.maxParticipant} 人 {props.modalDetail?.location} {props.modalDetail?.volState?'招募志愿者':'暂不招募志愿者'}
      </p>
    </div>
    <div className='actDetail-textpart'>
    <Labels labels={props.modalDetail?.labels}></Labels>
    <div className='actDetail-button'><Button onClick={props.handleCancel}>关闭</Button><Button onClick={() => {
      isLogined()
        ? handleSignUpAct(props.modelDetail?.id, getUserID())
        : message.error('请先登录！');
        
    }}>报名活动</Button>{ props.modalDetail?.volState?<Button id='volSignUpButton' onClick={() => {
      isLogined()
        ? handleVolSignUp(props.modelDetail?.id, getUserID())
        : message.error('请先登录！');
    }}>报名志愿者</Button>:null}</div></div>
</Modal>)
}

export default ActivityDetail;
