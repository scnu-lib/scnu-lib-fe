import React, { useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '@/reducers/actReducer';
import { initUserList } from '@/reducers/usermReducer';
import { Roles } from '@/Utils/config';
function User(props: any) {
  const dataSource = useSelector(store => store.userList);
  const dispatch = useDispatch();
  const getList = (page: number) => {
    dispatch(initUserList(page));
  };
  const handleDelete = (txt: any) => {
    console.log(txt);
  };
  useEffect(() => {
    getList(0);
  }, []);
  const columns = [
    {
      title: '用户id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户权限',
      dataIndex: 'role',
      render: (txt: any, record: any, index: any) => {
        switch (txt[0]) {
          case 'ROLE_USER':
            return <Tag color="geekblue">用户</Tag>;
          case 'ROLE_ADMIN':
            return <Tag color="orange">管理员</Tag>;
          case 'ROLE_LIBRARIAN':
            return <Tag color="lime">图书馆管理员</Tag>;
          default:
            return <Tag color="geekblue">用户</Tag>;
        }
      },
    },
    {
      title: '操作',
      render: (txt: any, record: any, index: any) => {
        return (
          <>
            <Button
              style={{ margin: '0 1rem' }}
              type="default"
              size="small"
              onClick={() => {
                props.history.push(`/home/adminUser/userdetails/1`);
              }}
            >
              修改
            </Button>
            <Button
              type="default"
              size="small"
              onClick={() => {
                props.history.push(`/home/adminUser/usernotices/1`);
              }}
            >
              {' '}
              联系
            </Button>
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

export default User;
