import React, { useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '@/reducers/actReducer';
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
    },
    {
      title: '活动标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '报名截止时间',
      dataIndex: 'signUpDeadline',
      key: 'signUpDeadline',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '报名人数',
      dataIndex: 'currentParticipant',
      key: 'currentParticipant',
    },
    {
      title: '最大报名人数',
      dataIndex: 'maxParticipant',
      key: 'maxParticipant',
    },
    {
      title: '操作',
      key: '',
      render: (txt: any, record: any, index: any) => {
        return (
          <>
            <Space>
              <Button
                type="default"
                size="small"
                onClick={() => {
                  props.history.push(
                    `/home/adminAct/actParticipants/${txt.id}`,
                  );
                }}
              >
                {' '}
                报名详情
              </Button>
              <Button
                type="default"
                size="small"
                onClick={() => {
                  props.history.push(`/home/adminAct/createact/${txt.id}`);
                }}
              >
                {' '}
                修改活动
              </Button>

              <Popconfirm
                title="确定删除此项？"
                onCancel={() => console.log('用户取消删除')}
                onConfirm={
                  () => console.log('用户确认删除') // 此处调用api接口进行操作
                }
              >
                <Button type="default" danger size="small">
                  {' '}
                  删除活动
                </Button>
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
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  );
}

export default ListAct;
