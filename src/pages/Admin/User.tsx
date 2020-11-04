import React,{useEffect} from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import { initList } from '@/reducers/actReducer';
import { initUserlist } from '@/reducers/usermReducer';
function User(props:any) {
  const dataSource = useSelector(store=>store.userlist)
  const dispatch = useDispatch()
  const getlist = (page:number) =>{
    dispatch(initUserlist(page))
  }
  const handledelete = (txt: any) => {
    console.log(txt)
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
            <Button style={{ margin: '0 1rem' }} type="primary" size="small" onClick={()=>{props.history.push(`/home/adminUser/userdetails/1`)}}>
              修改
            </Button>
              <Button type="primary"  size="small" onClick={()=>{props.history.push(`/home/adminUser/usernotices/1`)}}>
                {' '}
                联系
              </Button>
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
