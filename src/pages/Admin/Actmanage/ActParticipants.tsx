import React,{useEffect} from 'react';
import { Card, Table, Button, Popconfirm,Tag,Space, message} from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import {delvol, initParticipants, rejectvol, signinvol} from '@/reducers/actParticipantsReducer'
import { actsigninApi } from '@/Services/activity';
import { VolunteerApplicationState } from '@/Utils/config';
function ActParticipants(props:any) {
    const handlesignup =  async (record:object) => {//确认签到
        try{
            const res = await actsigninApi(props.match.params.id,record.id)
            message.success('签到成功！')
        }catch(err){
            console.log(err)
            message.error('签到失败！')
        }
    }
    const handlevolreject = async (record:object) => {//拒绝志愿者
      dispatch(rejectvol(props.match.params.id,record.id))
    }
    const handlevolsignup =  async (record:object) => {//志愿者报名
        dispatch(signinvol(props.match.params.id,record.id))
        
    }
    const handledelvol =  async (record:object) => {//志愿者取消
        dispatch(delvol(props.match.params.id,record.id))
    }
    const dataSource = useSelector(store=>store.actParticipants)
    const dispatch = useDispatch()
    const getParticipants = (activityID:string,pages:number = 0,size:number = 20)=>{
      dispatch(initParticipants(activityID,pages,size))
      
    }
    useEffect(()=>{
      getParticipants(props.match.params.id)
      console.log(dataSource)
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
        dataIndex: 'state',
        key:'state',
        render: (txt:VolunteerApplicationState,record: any, index: any) => {
            let color;
            switch(txt){
              case VolunteerApplicationState.accepted:color = 'green';return(<Tag color={color} key={txt}>通过</Tag>)
              case VolunteerApplicationState.rejected:color = 'red';return(<Tag color={color} key={txt}>不通过</Tag>)
              case VolunteerApplicationState.applied:color = 'geekblue';return(<Tag color={color} key={txt}>审核中</Tag>)
              default:return;
            }

        }
      },
      {
        title: '联系方式',
        dataIndex: 'connection',
        key:'connnection'
      },
      {
        title: '志愿者申请',
        key:'volaction',
        render: (txt: any, record: any, index: any) => {
          switch(record.state){
            case VolunteerApplicationState.accepted:return(<Button type="primary" size="small"  key='取消志愿者'onClick={()=>{handledelvol(record)}}>取消志愿者</Button>)
            case VolunteerApplicationState.rejected:return(<Button  type="primary" size="small"  key='通过申请' onClick={()=>{handlevolsignup(record)}}>通过申请</Button>)
            case VolunteerApplicationState.applied:return(<><Button  type="primary" size="small"  key='通过申请' onClick={()=>{handlevolsignup(record)}}>通过申请</Button> <Button type="primary" size="small" key='拒绝申请' onClick={()=>{handlevolreject(record)}}>拒绝申请</Button></>)
            default:return;
        }
      }
    }
    , {
      title: '签到',
      key:'signaction',
      render: (txt: any, record: any, index: any) => {
          return (
            <>
                <Space>
                 
                <Button type="primary" size="small" onClick={()=>handlesignup(record)}>
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
      <Card
        title="用户列表"
      >
        <Table columns={columns} dataSource={dataSource}/>
      </Card>
    );
}

export default ActParticipants
