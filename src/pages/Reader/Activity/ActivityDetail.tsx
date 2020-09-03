import React,{useEffect,useState} from 'react'
import {Card,Button,message} from 'antd'
import { detailApi, actsignupApi } from '@/Services/activity'
import './ActivityDetail.css'
import { isLogined } from '@/Utils/auth'
//活动页
function ActivityDetail(props:any) {
    const [detail,setDetail] = useState({"id": 0,
    "title": "阅读马拉松",
    "startTime": "2020-08-27",
    "content":'111',
    "endTime": "2020-08-27",
    "signUpDeadline": "2020-08-27",
    "maxParticipant": 40,
    "currentParticipant": 3,
    "location": "图书馆（石牌）",
    "issign":true,
    "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    "labels": [
      "string"
    ]})
    const [issigned,setIssigned] = useState(false)
    useEffect(()=>{
       console.log(props.match.params.id)
       detailApi(props.match.params.id).then((res)=>{
            setDetail(res.data)
       }).catch(err=>console.log(err))

    },[])
    const handlesignupact = (id:any)=>{
        actsignupApi(id).then(res=>{
            message.success('报名成功！')
            console.log(res)
            setIssigned(true)
    }).catch(err=>console.log(err))
    }
    return (
        <Card className='detail-card'>
            <div className='detail-card-text'>
            <img src={detail.src}></img>
            <div className='detail-card-text-words'>
                <h2>{detail.title}</h2>
               
                <p>开始时间:{detail.startTime}</p>
                <p>地点:{detail.location}</p>
                {issigned?<Button disabled>已报名</Button>:<Button onClick={
                   ()=>{ isLogined()?handlesignupact(detail.id):message.error('请先登录！')}
                }>报名参加</Button>}
                </div>
            </div>
            <Card className='detail-content'>
                {detail.content}
            </Card>
        </Card>
    )
}

export default ActivityDetail
