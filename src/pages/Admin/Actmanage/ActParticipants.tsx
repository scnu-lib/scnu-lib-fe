import React, { useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Tag, Space, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  delVol,
  initParticipants,
  rejectVol,
  signInVol,
} from '@/Reducers/ActParticipantsReducer';
import { actSignInApi } from '@/Services/Activity';
import { volunteerApplicationState } from '@/Utils/Config';
function ActParticipants(props: any) {
  const handleSignUp = async (record: object) => {
    //确认签到
    try {
      const res = await actSignInApi(props.match.params.id, record.id);
      message.success('签到成功！');
    } catch (err) {
      console.log(err);
      message.error('签到失败！');
    }
  };
  const handleVolReject = async (record: object) => {
    //拒绝志愿者
    dispatch(rejectVol(props.match.params.id, record.id));
  };
  const handleVolSignUp = async (record: object) => {
    //志愿者报名
    dispatch(signInVol(props.match.params.id, record.id));
  };
  const handleDelVol = async (record: object) => {
    //志愿者取消
    dispatch(delVol(props.match.params.id, record.id));
  };
  const dataSource = useSelector(store => store.actParticipants);
  const dispatch = useDispatch();
  const getParticipants = (
    activityID: number,
    pages: number = 0,
    size: number = 20,
  ) => {
    dispatch(initParticipants(activityID, pages, size));
  };
  useEffect(() => {
    getParticipants(props.match.params.id);
    console.log(dataSource);
  }, []);

  const columns = [
    {
      title: '用户id',
      dataIndex: 'id',
      key: '_id',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户等级',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '是否为志愿者',
      dataIndex: 'state',
      key: 'state',
      render: (txt: volunteerApplicationState, record: any, index: any) => {
        let color;
        switch (txt) {
          case volunteerApplicationState.accepted:
            color = 'green';
            return (
              <Tag color={color} key={`${txt}通过`}>
                通过
              </Tag>
            );
          case volunteerApplicationState.rejected:
            color = 'red';
            return (
              <Tag color={color} key={`${txt}不通过`}>
                不通过
              </Tag>
            );
          case volunteerApplicationState.applied:
            color = 'geekblue';
            return (
              <Tag color={color} key={`${txt}审核中`}>
                审核中
              </Tag>
            );
          default:
            return;
        }
      },
    },
    {
      title: '联系方式',
      dataIndex: 'connection',
      key: 'connnection',
    },
    {
      title: '志愿者申请',
      key: 'volaction',
      render: (txt: any, record: any, index: any) => {
        switch (record.state) {
          case volunteerApplicationState.accepted:
            return (
              <Button
                type="primary"
                size="small"
                key="取消志愿者"
                onClick={() => {
                  handledelvol(record);
                }}
              >
                取消志愿者
              </Button>
            );
          case volunteerApplicationState.rejected:
            return (
              <Button
                type="primary"
                size="small"
                key="通过申请"
                onClick={() => {
                  handlevolsignup(record);
                }}
              >
                通过申请
              </Button>
            );
          case volunteerApplicationState.applied:
            return (
              <>
                <Button
                  type="primary"
                  size="small"
                  key="通过申请"
                  onClick={() => {
                    handlevolsignup(record);
                  }}
                >
                  通过申请
                </Button>{' '}
                <Button
                  type="primary"
                  size="small"
                  key="拒绝申请"
                  onClick={() => {
                    handlevolreject(record);
                  }}
                >
                  拒绝申请
                </Button>
              </>
            );
          default:
            return;
        }
      },
    },
    {
      title: '签到',
      key: 'signaction',
      render: (txt: any, record: any, index: any) => {
        return (
          <>
            <Space>
              <Button
                type="primary"
                size="small"
                onClick={() => handleSignUp(record)}
              >
                {' '}
                签到
              </Button>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <Card title="用户列表">
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  );
}

export default ActParticipants;
