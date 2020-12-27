import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import Labels from '../../../components/Labels';
import { actSignUpApi, userVolSignUpApi } from '@/Services/activity';
import './ActivityDetail.css';
import { getUserID, isLogined } from '@/Utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import { volunteerApplicationState } from '@/Utils/config';
import { addRegisteredAct } from '@/reducers/actRegisteredReducer';
//活动页
function ActivityDetail(props: any) {
  //活动详情页，做成对话框形式，把所有活动信息列出来，加上报名志愿者和报名活动的按钮
  const [isSigned, setIsSigned] = useState(false);
  const [loading, setLoading] = useState([false, false]); //两个按钮，因为是异步操作，所以设置其loading状态，用usestate管理状态
  const dispatch = useDispatch(); // 更新已报名活动的状态
  const acts = useSelector(store => store.act); // 下面报名成功后只有id，通过id查找活动详情放到已报名活动中
  const handleSignUpAct = (activityID: number, id: number) => {
    //活动报名申请
    setLoading([true, loading[1]]); //调用按钮，设置loading[0]为正表示正在加载
    actSignUpApi(activityID, id)
      .then(res => {
        message.success('报名成功！');
        setTimeout(() => {
          dispatch(addRegisteredAct(acts));
        }, 2000); // 报名完直接更新所有已报名活动省事。给服务器缓冲时间
        setIsSigned(true);
        setLoading([false, loading[1]]);
      })
      .catch(err => {
        setLoading([false, loading[1]]);
        console.log(err);
      });
  };
  const handleVolSignUp = async (acitivityID: number, userID: number) => {
    setLoading([loading[0], true]);
    //志愿者报名申请，目前需要一个接口可以查询志愿者的状态
    try {
      const res = await userVolSignUpApi(
        acitivityID,
        userID,
        volunteerApplicationState.applied,
      );
      setLoading([loading[0], false]);
      message.success('报名成功！');
    } catch (err) {
      setLoading([loading[0], false]);
      console.log(err);
    }
  };
  return (
    <Modal
      className="actDetail-modal"
      title={props.modalDetail?.title}
      visible={props.isDetailsVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={null}
      width={550}
    >
      <div className={`img${props.modalDetail?.id}`}></div>

      <div className="actDetail-details">
        <p>
          报名截止于: {props.modalDetail?.signUpDeadline?.slice(5)} 活动日期：
          {props.modalDetail?.startTime?.slice(5)}~
          {props.modalDetail?.endTime?.slice(5)}{' '}
          {props.modalDetail?.currentParticipant}/
          {props.modalDetail?.maxParticipant} 人 {props.modalDetail?.location}{' '}
          {props.modalDetail?.volState ? '招募志愿者' : '暂不招募志愿者'}
        </p>
      </div>
      <div className="actDetail-textpart">
        <Labels labels={props.modalDetail?.labels}></Labels>
        <div className="actDetail-button">
          <Button
            loading={loading[0]}
            onClick={() => {
              isLogined()
                ? handleSignUpAct(props.modalDetail?.id, getUserID())
                : message.error('请先登录！');
            }}
          >
            报名活动
          </Button>
          {props.modalDetail?.volState ? (
            <Button
              id="volSignUpButton"
              loading={loading[1]}
              onClick={() => {
                isLogined()
                  ? handleVolSignUp(props.modalDetail?.id, getUserID())
                  : message.error('请先登录！');
              }}
            >
              报名志愿者
            </Button>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export default ActivityDetail;
