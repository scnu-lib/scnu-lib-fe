import React from 'react';
import { Popover, Affix, Menu } from 'antd';
import { isLogined } from '@/Utils/auth';
import { registeredState } from '@/reducers/actListShowReducer';
import { actLabel } from '@/Utils/config';
import { changeLabel, changeRegistered } from '@/reducers/actListShowReducer';
import { addRegisteredAct } from '@/reducers/actRegisteredReducer';
import { useDispatch, useSelector } from 'react-redux';
export const ActSortRadio = (props: object) => {
  //列表分类控制组件
  const dispatch = useDispatch();
  const actListShow = useSelector(store => store.actListShow);
  const labelGroupOnClick = (e: object) => {
    // 改变label
    console.log(`radio checked:${e.key}`);
    dispatch(changeLabel(e.key));
  };
  const showRegisteredGroupOnClick = (e: object) => {
    // 只显示已报名活动
    dispatch(changeRegistered(e.key));
    if (e.key === registeredState.registeredOnly && !props.regData.length)
      // 当regData等于空数组的时候再发送请求，不要浪费网络资源
      dispatch(addRegisteredAct(props.listData));
  };

  return (
    <Affix offsetTop={100}>
      <div className="act-sort-radio">
        <Menu
          className="act-list-sort-menu act-list-sort-menu1"
          mode="vertical-left"
          onClick={showRegisteredGroupOnClick}
          selectedKeys={[actListShow.registered]}
        >
          <Menu.Item key={registeredState.all}>全部活动</Menu.Item>
          {isLogined() ? (
            <Menu.Item key={registeredState.registeredOnly}>
              已报名活动
            </Menu.Item>
          ) : (
            <Menu.Item disabled key="registered">
              <Popover content="你需要登录后才能查看它">已报名活动</Popover>
            </Menu.Item>
          )}
        </Menu>
        <Menu
          className="act-list-sort-menu act-list-sort-menu2"
          onClick={labelGroupOnClick}
          selectedKeys={[actListShow.label]}
        >
          <Menu.Item key={actLabel.all}>全部分类</Menu.Item>
          <Menu.Item key={actLabel.readingClub}>读书会</Menu.Item>
          <Menu.Item key={actLabel.online}>线上</Menu.Item>
          <Menu.Item key={actLabel.offline}>线下</Menu.Item>
          <Menu.Item key={actLabel.pictureBookStory}>绘本故事</Menu.Item>
          <Menu.Item key={actLabel.filmSalon}>观影沙龙</Menu.Item>
          <Menu.Item key={actLabel.fridayCinema}>周五影院</Menu.Item>
        </Menu>
      </div>
    </Affix>
  );
};
