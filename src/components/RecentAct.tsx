import React from 'react';
import { Space, Card } from 'antd';
import Labels from '@/components/Labels';
import '@/pages/Reader/Activity/Activity.less';
import HandleDate from './HandleDate';
import { getPhoto } from '@/photoStorage/photoStorage';

const RecentAct = (props: object) => {
  const length = props.recent.length; //倒序输出
  let i = 0;
  return (
    <div className="recent-all">
      <div className="recent-decoration fadeEffect"></div>
      <Space className="recent-map" size="small">
        {props.recent.map((note: object, index: number) => {
          return index < length - 6 ? null : ( //输出最后6个活动
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
      </Space>
    </div>
  );
};

export default RecentAct;
