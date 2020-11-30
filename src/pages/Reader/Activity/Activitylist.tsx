import React, { useEffect } from 'react';
import { Card, List, Avatar, Space, Button, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '../../../reducers/actReducer';
import { Link } from 'umi';
import Item from 'antd/lib/list/Item';

function ActivityList() {
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
              extra={<img className="list-photo" alt="logo" src={item.src} />}
            >
              <List.Item.Meta
                title={
                  <Link to={`/home/activitydetail/${item.id}`}>
                    {item.title}
                  </Link>
                }
                description={
                  <p>
                    {item.startTime}~{item.endTime} {item.currentParticipant}/
                    {item.maxParticipant}人 {item.location}
                  </p>
                }
              />
              <p>
                {item.labels.map(tag => (
                  <Tag color="geekblue">{tag}</Tag>
                ))}
              </p>
            </List.Item>
          );
        }}
      />
    </Card>
  );
}

export default ActivityList;
