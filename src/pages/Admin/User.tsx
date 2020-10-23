import React,{useEffect} from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import { initList } from '@/reducers/actReducer';
import { initUserlist } from '@/reducers/usermReducer';
function User() {
  const dataSource = useSelector(store=>store.userlist)
  const dispatch = useDispatch()
  const getlist = (page:number) =>{
    dispatch(initUserlist(page))
  }
  useEffect(()=>{
   getlist(0)
  },[])
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
    },
    {
      title: '操作',
      render: (txt: any, record: any, index: any) => {

        return (
          <>
            <Button style={{ margin: '0 1rem' }} type="primary" size="small" onClick={()=>{console.log('开发中')}}> 
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
      title="用户列表"
    >
      <Table columns={columns} dataSource={dataSource} />
    </Card>
  );
}

export default User;
