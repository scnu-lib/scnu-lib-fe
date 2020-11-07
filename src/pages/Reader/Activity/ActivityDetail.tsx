import React,{useEffect,useState} from 'react'
import {Card,Button,message} from 'antd'
import {initActDetail} from '@/reducers/actDetailReducer'
import { detailApi, actsignupApi, volsignupApi, uservolsignupApi } from '@/Services/activity'
import './ActivityDetail.css'
import { getUserID, isLogined } from '@/Utils/auth'
import {useSelector,useDispatch} from 'react-redux'
import { VolunteerApplicationState } from '@/Utils/config'
//活动页
function ActivityDetail(props:any) {
    const detail = useSelector(store=>store.actDetail)
    const dispatch = useDispatch()
    const [issigned,setIssigned] = useState(false)
    
    useEffect(()=>{
        dispatch(initActDetail(props.match.params.id))

    },[])
    const handlesignupact = (id:any)=>{
        actsignupApi(props.match.params.id,id).then(res=>{
            message.success('报名成功！')
            setIssigned(true)
    }).catch(err=>console.log(err))
    }
    const handlevolsignup = async (acitivityID:number,userID:number) => {//志愿者报名申请，目前需要一个接口可以查询志愿者的状态
        try{
        const res = await uservolsignupApi(acitivityID,userID,VolunteerApplicationState.applied)
        message.success('报名成功！')
        }catch(err){
            console.log(err)
        }
    }
    return (
        <Card className='detail-card'>
            <div className='detail-card-text'>
            <img src={detail.src}></img>
            <div className='detail-card-text-words'>
                <h2>{detail.title}</h2>
                <p>开始时间:{detail.startTime}</p>
                <p>地点:{detail.location}</p>
                {issigned?<><Button disabled>已报名</Button><Button onClick={()=>{handlevolsignup(detail.id,getUserID())}}>报名志愿者</Button></>:<Button onClick={
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
