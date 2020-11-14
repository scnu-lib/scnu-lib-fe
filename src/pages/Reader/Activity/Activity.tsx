import React,{useEffect,useState} from 'react'
import { Carousel,message,Card,Space} from 'antd';
import { listactApi } from '@/Services/activity';
import {Link} from 'umi'
import './Activity.css'
import {useDispatch,useSelector} from 'react-redux'
import {initList} from '../../../reducers/actReducer'

//活动列表页
const contentStyle = [{
    id:1,
    src:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  },{
    id:2,
    src:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  },{
    id:3,
    src:'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
  }];

 
function Activity(props:any) {
    const recent = useSelector(state=>state.act)

    const dispatch = useDispatch()
    const getrecentAct =  () =>{//把最近的活动拿到，暂时通过标签确定最近,只需要三个
        try{
        dispatch(initList('recent',0,3))}
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getrecentAct()
        //setRecent(recentlist)
    },[])
    return (
    <Space direction='vertical'  className="Activity .flex" size="large">
        <Carousel autoplay >
               {contentStyle.map(note=>(
               <img  src={note.src} key={note.id} alt={String(note.id)}></img>
               ))}
        </Carousel>
        <Space direction="vertical" className="recent-Act"size="middle" >
            {recent.length?<span style={{margin:'24px',fontSize:'22px',fontWeight:500,textAlign:'center',color:'#5c6b77',textTransform:'capitalize'}}>近期活动</span>
            :null}<Space className='recent-map' size="small">
             {recent.map((note:object,index:number)=>index<6?(
                 <Card  className='note-Card' key={`${note.id}Card`}>
            <Link key={`${note.id}Link`} to={`/home/activitydetail/${note.id}`}><img src={note.src} key={note.id} alt={note.title} style={{width:'100%',height:'80%',objectFit:'cover'}}
            ></img>
                <div className='note-title' style={{textAlign:'center'}}>{note.title}</div>
                <div className='note-date' style={{textAlign:'center'}}>{note.date}</div>
            </Link></Card>):null)}
            </Space>
        </Space>
        
    </Space>
    )
}

export default Activity
