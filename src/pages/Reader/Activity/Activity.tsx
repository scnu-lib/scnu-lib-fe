import React, { useEffect, useState } from 'react';
import { Carousel, message, Card, Space, Timeline, Tag, Modal } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import './Activity.less';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '../../../reducers/actReducer';
import Labels from './Labels';
import ActivityDetail from './ActivityDetail';

//活动列表页

function Activity(props: any) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [modalDetail, setModalDetail] = useState({}); //把活动详情做成一个小对话框，用state控制其打开和关闭
  const showModal = (id: number) => {
    setModalDetail(recent.find(note => note.id === id));
    setIsDetailsVisible(true);
  }; //这几个都是相应的控制活动的函数

  const handleOk = () => {
    setIsDetailsVisible(false);
  };

  const handleCancel = () => {
    setIsDetailsVisible(false);
  };
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
      <Space direction="vertical" className="recent-Act" size="middle">
        {recent.length ? (
          <span
            style={{
              margin: '22px',
              fontSize: '24px',
              fontWeight: 2000,
              textAlign: 'center',
              color: '#5c6b77',
              textTransform: 'capitalize',
            }}
          >
            近期活动
          </span>
        ) : null}
        <div className="recent-all">
          <div className="recent-decoration fadeEffect"></div>
          <Space className="recent-map" size="small">
            {recent.map((note: object, index: number) =>
              index < 6 ? (
                <Card className="note-Card fadeEffect" key={`${note.id}Card`}>
                  {/*<Link
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
                  ></img>*/}
                  <a onClick={() => showModal(note.id)}>
                    <div className={`img${note.id}`}></div>
                    <div className="note-title" style={{ textAlign: 'center' }}>
                      {note.title}
                    </div>

                    <div className="note-date" style={{ textAlign: 'center' }}>
                      {note.date}
                    </div>
                    <Labels labels={note.labels}></Labels>
                    {/* </Link>*/}
                  </a>
                </Card>
              ) : null,
            )}
          </Space>
        </div>
      </Space>
      <ActivityDetail
        isDetailsVisible={isDetailsVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        modalDetail={modalDetail}
      ></ActivityDetail>
    </Space>
  );
}

export default Activity;
