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
              <a onClick={() => props.showModal(note.id)}>
                <div className={'hiddenImg'}>
                  <img
                    className={`img${(i = i + 1)} img`}
                    alt={`img${(i = i + 1)} img`}
                    src={`${getPhoto(note.id)}?dummy=${new Date().getTime()}`}
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
