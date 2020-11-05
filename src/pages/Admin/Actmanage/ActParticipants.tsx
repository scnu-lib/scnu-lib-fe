import React,{useEffect} from 'react';
import { Card, Table, Button, Popconfirm,Tag,Space} from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import {delvol, initParticipants, signinvol} from '@/reducers/actParticipantsReducer'
import { actsigninApi } from '@/Services/activity';
function ActParticipants(props:any) {
    const handlesignup =  async (record:object) => {//确认签到
        try{
            const res = await actsigninApi(props.match.params.id,record.id)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    const handlevolsignup =  async (record:object) => {//志愿者报名
        dispatch(signinvol(props.match.params.id,record.id))
       console.log(dataSource)
    }
    const handledelvol =  async (record:object) => {//志愿者取消
        dispatch(delvol(props.match.params.id,record.id))
       console.log(dataSource)
    }
    const dataSource = useSelector(store=>store.actParticipants)
    const dispatch = useDispatch()
    const getParticipants = (activityID:string,pages:number = 0,size:number = 20)=>{
      dispatch(initParticipants(activityID,pages,size))
    }
    useEffect(()=>{
      getParticipants(props.match.params.id)
    },[])

    const columns = [
      {
        title: '用户id',
        dataIndex: 'id',
        key: '_id',
      },
      {
        title:'用户名称',
        dataIndex:'name',
        key:'name'
      },
      {
        title: '用户等级',
        dataIndex: 'role',
        key:'role'
      },
      {
        title: '是否为志愿者',
        dataIndex: 'volunteer',
        key:'volunteer',
        render: (txt:boolean,record: any, index: any) => {
            let color = txt ?'green':'geekblue';
            return( 
            <Tag color={color} key={index}>{txt?'是':'否'}</Tag>
            )
        }
      },
      {
        title: '联系方式',
        dataIndex: 'connection',
        key:'connnection'
      },
      {
        title: '操作',
        key:'action',
        render: (txt: any, record: any, index: any) => {
//回调函数再调用一次函数就可以使用作用域链上的变量
          return (
            <>
                <Space>
                <Button type="primary" size="small" onClick={()=>handlevolsignup(record)}>
                    {' '}
                    {record.volunteer?'取消志愿者':'报名志愿者'}
                </Button>
                <Button type="primary" size="small" onClick={()=>handlesignup(record)}>
                    {' '}
                    签到
                </Button>
              <Popconfirm
                title="确定删除此项？"
                onCancel={() => console.log('用户取消删除')}
                onConfirm={
                  () => console.log('用户确认删除') // 此处调用api接口进行操作
                }
              >
                <Button type="primary" danger size="small">
                  {' '}
                  删除
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
        title="用户列表"
      >
        <Table columns={columns} dataSource={dataSource}/>
      </Card>
    );
}

export default ActParticipants
