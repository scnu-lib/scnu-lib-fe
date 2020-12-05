import React, { useEffect,useState } from 'react';
import { Card, List, Avatar, Space, Button, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '../../../reducers/actReducer';
import { Link } from 'umi';
import Item from 'antd/lib/list/Item';
import Labels from './Labels';
import ActivityDetail from './ActivityDetail';

function ActivityList() {
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
  const listData = useSelector(state => state.act);
  const dispatch = useDispatch();
  const getPage = (label = 'text', page = 0, size = 6) => {
    dispatch(initList(label, page, size));
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
            getPage('text', page);
          },
          pageSize: 6,
        }}
        dataSource={listData}
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

export default ActivityList;
