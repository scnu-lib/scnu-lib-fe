import React from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
//活动列表

const dataSource = [
  {
    id: 1,
    age: '香皂',
    time: 5,
  },
];

function ListAct(props: any) {
  const columns = [
    {
      title: '活动id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '活动标题',
      dataIndex: 'age',
    },
    {
      title: '活动时间',
      dataIndex: 'time',
    },
    {
      title: '操作',
      render: (txt: any, record: any, index: any) => {
        return (
          <>
            <Button size="small">查看已报名学生</Button>
            <Button style={{ margin: '0 1rem' }} type="primary" size="small">
              修改
            </Button>
            <Popconfirm
              title="确定删除此项？"
              onCancel={() => console.log('用户取消删除')}
              onConfirm={
                () => console.log('用户确认删除') //此处调用api接口进行操作
              }
            >
              <Button type="primary" danger size="small">
                {' '}
                删除
              </Button>
            </Popconfirm>
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
