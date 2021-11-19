import React from 'react';
import { Space, Card, Empty } from 'antd';
import Labels from '@/components/Labels';
import '@/pages/Reader/Activity/Activity.less';
import HandleDate from './HandleDate';
import { getPhoto } from '@/photoStorage/photoStorage';
const NullActCard = id => {
  return (
    <Card className="note-Card" key={`${id}Card`}>
      <Empty
        className={'null-act-card'}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={false}
      />
    </Card>
  );
};
const RecentAct = (props: {
  recent: any[];
  showModal: (id: number) => void;
}) => {
  const length = props.recent.length; // 倒序输出
  let i = 0;
  const lackNumber = 6 - props.recent.length; // 计算需要填充的活动数量
  return (
    <div className="recent-all">
      <div className="recent-decoration fadeEffect"></div>
      <Space className="recent-map" size="small">
        {props.recent.map((note: object, index: number) => {
          return index < length - 6 ? null : ( // 输出最后6个活动
            <Card
              className="note-Card fadeEffect CardHover"
              key={`${note.id}Card`}
            >
              <a onClick={() => props.showModal(note.id)}>
                <div className={'hiddenImg'}>
                  <img
                    className={'recentImg'}
                    alt={`recentImg${(i = i + 1)} img`}
                    src={`${getPhoto(
                      `actPhoto${note.id}`,
                    )}?dummy=${new Date().getTime()}`}
                  ></img>
                </div>
                <div className="note-title" style={{ textAlign: 'center' }}>
                  {note.title}
                </div>
                <Labels labels={note.labels}></Labels>
                <div className="note-date">
                  {HandleDate(note.startTime) + '~' + HandleDate(note.endTime)}
                </div>
                {/* </Link>*/}
              </a>
            </Card>
          );
        })}
        {lackNumber > 0
          ? new Array(lackNumber)
              .fill(0)
              .map((val: number, index: number) => (
                <NullActCard id={index + 10} />
              ))
          : null}
      </Space>
    </div>
  );
};

export default RecentAct;
