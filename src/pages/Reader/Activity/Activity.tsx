import React,{useEffect,useState} from 'react'
import { Carousel,message,Card,Space} from 'antd';
import { listactApi } from '@/Services/activity';
import {Link} from 'umi'
import './Activity.css'
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
    src:'http://pic.netbian.com/uploads/allimg/190222/203541-15508389415b13.jpg'
  },{
    id:2,
    src:'http://pic.netbian.com/uploads/allimg/170826/164902-15037373421e3a.jpg'
  },{
    id:3,
    src:'http://pic.netbian.com/uploads/allimg/170309/152836-14890445161bf2.jpg'
  }];

 
function Activity(props:any) {
    const [recent,setRecent] = useState([{src:'111',id:'222'}])
    const getrecentAct = async () =>{//把最近的活动拿到，暂时通过标签确定最近,只需要三个
        const res = await listactApi('recent',0,3);
        console.log(res)
        setRecent(res.data)
    }
    useEffect(()=>{
        //getrecentAct()
        setRecent(recentlist)
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
                 <Card  className='note-Card'>
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
