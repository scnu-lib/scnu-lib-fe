import React,{useEffect} from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import { initList } from '@/reducers/actReducer';
//活动列表

function ListAct(props: any) {
  const dataSource = useSelector(store=>store.act)
  const dispatch = useDispatch()
  const getAct = (page:number = 0)=>{
    dispatch(initList('all',page,20))
  }
  useEffect(()=>{
    getAct()
  },[])

  const columns = [
    {
      title: '活动id',
      dataIndex: 'id',
      key: '_id',
    },
    {
      title: '活动标题',
      dataIndex: 'title',
    },
    {
      title: '活动时间',
      dataIndex: 'startTime',
    },
    {
      title: '报名人数',
      dataIndex: 'currentParticipant',
    },
    {
      title: '最大报名人数',
      dataIndex: 'maxParticipant',
    },
    {
      title: '操作',
      render: (txt: any, record: any, index: any) => {

        return (
          <>
            <Button style={{ margin: '0 1rem' }} type="primary" size="small" onClick={()=>{props.history.push(`/home/adminAct/createact/${txt.id}`)}}> 
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
