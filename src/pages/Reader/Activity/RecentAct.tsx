import React from 'react';
import { Space, Card } from 'antd';
import Labels from '@/components/Labels';
export const RecentAct = (props: object) => {
  return props.recent.length ? (
    <div className="recent-all">
      <div className="recent-decoration fadeEffect"></div>
      <Space className="recent-map" size="small">
        {props.recent.map((note: object, index: number) =>
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
              <a onClick={() => props.showModal(note.id)}>
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
  ) : (
    <div className="empty-act-list">暂无活动</div>
  );
};
