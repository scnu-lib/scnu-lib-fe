import React,{useEffect,useState} from 'react'
import { Carousel,message,Card,Space} from 'antd';
import { listactApi } from '@/Services/activity';
import {Link} from 'umi'
import './Activity.css'
import {useDispatch,useSelector} from 'react-redux'
import {initList} from '../../../reducers/actReducer'
//活动列表页
let d = new Date()
const recentlist = [{src:'https://img9.doubanio.com/view/photo/l/public/p1188029166.webp',id:'1',title:'傲慢与偏见',date:'2020.08.26~08.29'},
{src:'https://img3.doubanio.com/view/photo/l/public/p1910907590.webp',id:'2',title:'教父1',date:'2020.08.26~08.29'},
{src:'https://img3.doubanio.com/view/photo/l/public/p462657443.webp',id:'3',title:'蝙蝠侠：黑暗骑士',date:'2020.08.26~08.29'},
{src:'https://img9.doubanio.com/view/photo/l/public/p2189265085.webp',id:'4',title:'罗马假日',date:'2020.08.26~08.29'},
{src:'https://img1.doubanio.com/view/photo/m/public/p453731188.webp',id:'5',title:'贝克街的亡灵',date:'2020.08.26~08.29'},
{src:'https://img9.doubanio.com/view/photo/m/public/p457760035.webp',id:'6',title:'泰坦尼克号',date:'2020.08.26~08.29'},]

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
    <Space direction='vertical'  className="Activity">
        <Carousel autoplay >
               {contentStyle.map(note=>(
               <img  src={note.src} key={note.id} alt={String(note.id)}></img>
               ))}
        </Carousel>
        <Space direction="vertical" className="recent-Act" >
            <span>近期活动</span>
            <Space className='recent-map' >
             {recent.map(note=>(
                 <Card  className='note-Card' key={`${note.id}Card`}>
            <Link key={`${note.id}Link`} to={`/home/activitydetail/${note.id}`}><img src={note.src} key={note.id} alt={note.title} style={{width:'100%',height:'80%',objectFit:'cover'}}
            ></img>
                <div className='note-title' style={{textAlign:'center'}}>{note.title}</div>
                <div className='note-date' style={{textAlign:'center'}}>{note.date}</div>
            </Link></Card>))}
            </Space>
        </Space>
        <Space direction="vertical" className="">

        </Space>
    </Space>
    )
}

export default Activity
