import React,{useEffect} from 'react'
import { Card, List, Avatar, Space,Button} from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import {initList} from '../../../reducers/actReducer'
import { Link } from 'umi';

function Activitylist() {
    const listData = useSelector(state=>state.act)
    const dispatch = useDispatch()
    const getPage = (label='text',page=0,size=4) =>{
        dispatch(initList(label,page,size))
        
    }
    useEffect(()=>{
    getPage()
},[])

    return (
        <Card className='user-act-list'>
             <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
        getPage('text',page)
      },
      pageSize: 4,
    }}
    dataSource={listData}
   
    renderItem={item => {
        return(
      <List.Item
        key={item.id}
        
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          title={<Link to={`/home/activitydetail/${item.id}`}>{item.title}</Link>}
    description={<p>{item.startTime}~{item.endTime}   {item.currentParticipant}/{item.maxParticipant}人 {item.location}</p>}
        />
        <p>这是一个非常不错的活动~</p>
      </List.Item>
    )}}
  />
        </Card>
    )
}

export default Activitylist
