import React from 'react';
import { Tag } from 'antd';
import { actLabel } from '@/Utils/config';
function Labels(props: object) {
  //管理标签的组件
  return (
    <div className="note-labels" key="note-labels">
      {props.labels.map(label => {
        switch (label) {
          case actLabel.readingClub:
            return (
              <Tag
                color="geekblue"
                key={`tag${props.itemId}${actLabel.readingClub}`}
              >
                读书会
              </Tag>
            );
          case actLabel.offline:
            return (
              <Tag color="gold" key={`tag${props.itemId}${actLabel.offline}`}>
                线下
              </Tag>
            );
          case actLabel.online:
            return (
              <Tag color="pink" key={`tag${props.itemId}${actLabel.online}`}>
                线上
              </Tag>
            );
          case actLabel.fridayCinema:
            return (
              <Tag
                color="purple"
                key={`tag${props.itemId}${actLabel.fridayCinema}`}
              >
                周五影院
              </Tag>
            );
          case actLabel.seniorSharingMeeting:
            return (
              <Tag
                color="green"
                key={`tag${props.itemId}${actLabel.seniorSharingMeeting}`}
              >
                师兄师姐说
              </Tag>
            );
          case actLabel.pictureBookStory:
            return (
              <Tag
                color="magenta"
                key={`tag${props.itemId}${actLabel.pictureBookStory}`}
              >
                绘本故事
              </Tag>
            );
          case actLabel.filmSalon:
            return (
              <Tag
                color="volcano"
                key={`tag${props.itemId}${actLabel.filmSalon}`}
              >
                观影沙龙
              </Tag>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default Labels;
