import React, { useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Space, Popover } from 'antd';

import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '@/reducers/actReducer';
import { initActDetail } from '@/reducers/actDetailReducer';
// 活动列表

function ListAct(props: any) {
  const dataSource = useSelector(store => store.act);
  const dispatch = useDispatch();
  const getAct = (page: number = 0) => {
    dispatch(initList('all', page, 20));
  };
  useEffect(() => {
    getAct();
  }, []);

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: '_id',
      responsive: ['md'],
    },
    {
      title: '活动标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '报名截止时间',
      key: 'signUpDeadline',
      responsive: ['md'],
      render: (txt: any, record: any, index: any) => {
        return txt.signUpDeadline
          .slice(5, 16)
          .replace('-', '.')
          .replace('T', ' ');
      },
    },
    {
      title: '活动时间',
      key: 'startendTime',

      render: (txt: any, record: any, index: any) => {
        return (
          txt.startTime
            .slice(5, 16)
            .replace('-', '.')
            .replace('T', ' ') +
          '~' +
          txt.endTime
            .slice(5, 16)
            .replace('-', '.')
            .replace('T', ' ')
        );
      },
    },
    {
      title: '报名人数',
      key: 'Participant',
      responsive: ['md'],

      render: (txt: any, record: any, index: any) => {
        return txt.currentParticipant + '/' + txt.maxParticipant;
      },
    },
    {
      title: '操作',
      key: '',
      fix: 'right',

      render: (txt: any, record: any, index: any) => {
        return (
          <>
            <Space>
              <Popover content={<div>查看用户列表</div>}>
                <UserSwitchOutlined
                  onClick={() => {
                    props.history.push(
                      `/home/adminAct/actParticipants/${txt.id}`,
                    );
                  }}
                />
              </Popover>
              <Popover content={<div>编辑该活动</div>}>
                <EditOutlined
                  onClick={() => {
                    dispatch(initActDetail(txt.id));
                    setTimeout(() => {
                      props.history.push(`/home/adminAct/createact/${txt.id}`);
                    }, 100); //给一定的延迟加入到任务队列里，为了先dispatch更新数据再跳到页面，这样就不用管表单初始化问题了
                  }}
                />
              </Popover>
              <Popconfirm
                title="确定删除此项？"
                onCancel={() => console.log('用户取消删除')}
                onConfirm={
                  () => console.log('用户确认删除') // 此处调用api接口进行操作
                }
              >
                <DeleteOutlined
                  onClick={() => {
                    console.log('delete');
                  }}
                />
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <Card
      title="活动列表"
      extra={
        <Button
          type="primary"
          onClick={() => props.history.push('/home/adminAct/createact')}
        >
          新增
        </Button>
      }
    >
      {document.body.clientWidth < 676 ? (
        <Table columns={columns} dataSource={dataSource} size="small" />
      ) : (
        <Table columns={columns} dataSource={dataSource} size="middle" />
      )}
    </Card>
  );
}

export default ListAct;
