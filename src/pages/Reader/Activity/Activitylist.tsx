import React, { useEffect,useState } from 'react';
import { Card, List, Avatar, Space, Button, Tag ,Radio, message, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '../../../reducers/actReducer';
import { Link } from 'umi';
import Item from 'antd/lib/list/Item';
import Labels from './Labels';
import ActivityDetail from './ActivityDetail';
import { actLabel } from '@/Utils/config';
import { actSignUpApi } from '@/Services/activity';
import { getUserID, isLogined } from '@/Utils/auth';
import actRegisteredReducer, { addRegisteredAct } from '@/reducers/actRegisteredReducer';
import {changeLabel,changeRegistered, initActShow} from '@/reducers/actListShowReducer'
function ActivityList() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [modalDetail, setModalDetail] = useState({});// 把活动详情做成一个小对话框，用state控制其打开和关闭
  const showModal = (id:number) => {
    setModalDetail(listData.find(note=>note.id===id));
    setIsDetailsVisible(true);
  };// 这几个都是相应的控制活动的函数
  const actListShow = useSelector(store=>store.actListShow);
  const handleOk = () => {

    setIsDetailsVisible(false);
  };

  const handleCancel = () => {
    setIsDetailsVisible(false);
  };
  const listData = useSelector(state => state.act);
  const regData = useSelector(state => state.regAct);
  let showData = actListShow.registered?regData:listData;// 显示到屏幕上的数据，默认是所有,有两层逻辑，这里是第一层
  (()=>{
    switch(actListShow.label){// 根据标签选取特定数据，第二层
      case actLabel.filmSalon:return showData = showData.filter(act=>act.labels.find(l => l === actLabel.filmSalon));
      case actLabel.fridayCinema:return showData = showData.filter(act=>act.labels.find(l => l === actLabel.fridayCinema));
      case actLabel.offline:return showData = showData.filter(act=>act.labels.find(l => l === actLabel.offline));
      case actLabel.online:return showData = showData.filter(act=>act.labels.find(l => l === actLabel.online));
      case actLabel.pictureBookStory:return showData = showData.filter(act=>act.labels.find(l => l === actLabel.pictureBookStory));
      case actLabel.readingClub:return showData = showData.filter(act=>act.labels.find(l => l === actLabel.readingClub));
      case actLabel.seniorSharingMeeting:return showData = showData.filter(act=>act.labels.find(l => l === actLabel.seniorSharingMeeting));
      default:return showData;
    }
  })()

  const dispatch = useDispatch();
  const getPage = (label = 'text', page = 0, size = 6) => {
    dispatch(initList(label, page, size));
  };
  useEffect(() => {
    dispatch(changeLabel(actLabel.all));// 初始化显示状态，获得第一页请求
    dispatch(initActShow());
    getPage();
  }, []);
  const labelGroupOnChange = (e:object)=>{// 改变label
    console.log(`radio checked:${e.target.value}`);
    dispatch(changeLabel(e.target.value));

  }
  const showRegisteredGroupOnChange = (e:object)=>{// 只显示已报名活动
    dispatch(changeRegistered());
    if(e.target.value === 'registered'&&!regData.length)// 当regData等于空数组的时候再发送请求，不要浪费网络资源
      dispatch(addRegisteredAct(listData));
  }
  return (
    <div><Radio.Group onChange={showRegisteredGroupOnChange} defaultValue="all">
    <Radio.Button value="all">全部活动</Radio.Button>
    {isLogined()?<Radio.Button value="registered">已报名活动</Radio.Button>:<Popover content='你需要登录后才能查看它'><Radio.Button disabled value="registered">已报名活动</Radio.Button></Popover>}
  </Radio.Group>
    <Radio.Group onChange={labelGroupOnChange}  defaultValue={actLabel.all}>
    <Radio.Button value={actLabel.all}>全部分类</Radio.Button>
    <Radio.Button value={actLabel.readingClub}>读书会</Radio.Button>
    <Radio.Button value={actLabel.online}>线上</Radio.Button>
    <Radio.Button value={actLabel.offline}>线下</Radio.Button>
    <Radio.Button value={actLabel.pictureBookStory}>绘本故事</Radio.Button>
    <Radio.Button value={actLabel.filmSalon}>观影沙龙</Radio.Button>
    <Radio.Button value={actLabel.fridayCinema}>周五影院</Radio.Button>
    </Radio.Group>
    <Card className="user-act-list">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
            getPage('text', page);
          },
          pageSize: 6,
        }}
        dataSource={showData}
        renderItem={item => {
          return (
            <List.Item
              key={item.id}

            >
              <List.Item.Meta
                title={
                  <a onClick={()=>{showModal(item.id)}}>
                    {item.title}
                  </a>
                }
                description={
                  <p>
                    {item.startTime}~{item.endTime} {item.currentParticipant}/
                    {item.maxParticipant}人 {item.location}
                  </p>
                }
              />
              <div>
                {<Labels labels={item.labels} itemId = {item.id} />}
              </div>
            </List.Item>
          );
        }}
      />
      <ActivityDetail isDetailsVisible={isDetailsVisible} handleOk={handleOk} handleCancel={handleCancel} modalDetail={modalDetail}/>
    </Card>
    </div>
  );
}

export default ActivityList;
