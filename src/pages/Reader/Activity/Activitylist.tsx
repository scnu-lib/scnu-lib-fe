import React,{useEffect,useState} from 'react'
import { Card, List, Avatar, Space,Button} from 'antd';
import { listactApi } from '@/Services/activity';
import { Link } from 'umi';

function Activitylist() {
    const [listData,setListData] = useState([{
        "id": 0,
        "title": "string",
        "startTime": "2020-08-27T06:38:14.739Z",
        "endTime": "2020-08-27T06:38:14.739Z",
        "signUpDeadline": "2020-08-27T06:38:14.739Z",
        "maxParticipant": 0,
        "currentParticipant": 0,
        "location": "string",
        "labels": [
          "string"
        ]
    }])
    const getPage = async (label='text',page=0,size=3) =>{
        const res = await listactApi(label,page,size);
        setListData(res.data)
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
        getPage('text',page,4)
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
