import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import { listActApi } from '@/Services/activity';
import { Link } from 'umi';
import {useDispatch,useSelector} from 'react-redux'
import { initList } from '@/reducers/actReducer';
import Labels from './Labels'
import ActivityDetail from './ActivityDetail';
//已报名活动页
function RegisteredAct(props: any) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [modalDetail, setModalDetail] = useState({});// 把活动详情做成一个小对话框，用state控制其打开和关闭
  const showModal = (id:number) => {
    setModalDetail(listData.find(note=>note.id===id));
    setIsDetailsVisible(true);
  };// 这几个都是相应的控制活动的函数

  const handleOk = () => {

    setIsDetailsVisible(false);
  };

  const handleCancel = () => {
    setIsDetailsVisible(false);
  };
  const dispatch = useDispatch()
  const listData = useSelector(store=>store.act)
  
  const getPage = (label = 'registered', page = 0, size = 4) => {
    dispatch(initList(label, page, size))
  };
  useEffect(() => {
    getPage();
    
  }, []);

  return (
    <Card className="user-act-list">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
            getPage('text', page, 4);
          },
          pageSize: 4,
        }}
        dataSource={listData}
        renderItem={item => {
          return (
            <List.Item
              key={item.id}
              extra={
                /*<img
                  className="list-photo"
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />*/
                <div className={`img${item.id}`}></div>
              }
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
              <p>
                {<Labels labels={item.labels} />}
              </p>
            </List.Item>
          );
        }}
      />
      <ActivityDetail isDetailsVisible={isDetailsVisible} handleOk={handleOk} handleCancel={handleCancel} modalDetail={modalDetail}/>
    </Card>
  );
}

export default RegisteredAct;
