import React, { useEffect, useState } from 'react';
import { Carousel, message, Card, Space, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import './Activity.css';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '../../../reducers/actReducer';

//活动列表页

function Activity(props: any) {
  const recent = useSelector(state => state.act);
  const dispatch = useDispatch();
  const getRecentAct = () => {
    //把最近的活动拿到，暂时通过标签确定最近,只需要三个
    try {
      dispatch(initList('recent', 0, 3));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRecentAct();
    //setRecent(recentlist)
  }, []);
  return (
    <Space direction="vertical" className="Activity .flex" size="large">
      <div className="Activity-item1">
        <Carousel className="act-carousel" autoplay>
          {recent.map((note: object, index: number) => {
            return index < 4 ? (
              <Link
                className="act-carousel-link"
                key={`${note.id}Link`}
                to={`/home/activitydetail/${note.id}`}
              >
                <img
                  className="act-carousel-link-img"
                  src={note.src}
                  key={note.id}
                  alt={String(note.id)}
                ></img>
              </Link>
            ) : null;
          })}
        </Carousel>
        <Card className="TimeLine-card">
          <Timeline className="TimeLine-card-act" mode="right">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item
              dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
              color="red"
            >
              Technical testing 2015-09-01
            </Timeline.Item>
            <Timeline.Item>
              Network problems being solved 2015-09-01
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
      <Space direction="vertical" className="recent-Act" size="middle">
        {recent.length ? (
          <span
            style={{
              margin: '24px',
              fontSize: '22px',
              fontWeight: 500,
              textAlign: 'center',
              color: '#5c6b77',
              textTransform: 'capitalize',
            }}
          >
            近期活动
          </span>
        ) : null}
        <Space className="recent-map" size="small">
          {recent.map((note: object, index: number) =>
            index < 6 ? (
              <Card className="note-Card" key={`${note.id}Card`}>
                <Link
                  key={`${note.id}Link`}
                  to={`/home/activitydetail/${note.id}`}
                >
                  <img
                    src={note.src}
                    key={note.id}
                    alt={note.title}
                    style={{
                      width: '100%',
                      height: '80%',
                      borderRadius: '9px 9px 0 0',
                    }}
                  ></img>
                  <div className="note-title" style={{ textAlign: 'center' }}>
                    {note.title}
                  </div>
                  <div className="note-date" style={{ textAlign: 'center' }}>
                    {note.date}
                  </div>
                </Link>
              </Card>
            ) : null,
          )}
        </Space>
      </Space>
    </Space>
  );
}

export default Activity;
