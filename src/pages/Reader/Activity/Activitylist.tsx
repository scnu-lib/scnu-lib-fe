import React, { useEffect, useState } from 'react';
import { Card, List, Affix, Drawer } from 'antd';
import { RootState } from '@/store';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '../../../reducers/actReducer';
import Labels from '../../../components/Labels';
import { actLabel } from '@/Utils/config';
import {
  changeDrawer,
  changeLabel,
  initActShow,
  registeredState,
} from '@/reducers/actListShowReducer';
import { ActSortRadio } from './ActSortRadio';
import { lazy, Suspense } from 'react';

const ActivityDetail = lazy(() => import('./ActivityDetail'));
function ActivityList() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [modalDetail, setModalDetail] = useState({}); // 把活动详情做成一个小对话框，用state控制其打开和关闭
  const actListShow = useSelector((store: RootState) => store.actListShow);
  const showModal = (id: number) => {
    setModalDetail(listData.find(note => note.id === id));
    setIsDetailsVisible(true);
  }; // 这几个都是相应的控制活动的函数
  const clientWidth = useSelector(
    (store: RootState) => store.globalConfig.clientWidth,
  );
  const handleOk = () => {
    setIsDetailsVisible(false);
  };

  const handleCancel = () => {
    setIsDetailsVisible(false);
  };
  const listData = useSelector((state: RootState) => state.act);
  const regData = useSelector((state: RootState) => state.regAct);
  //将regAc数据格式从数字数组转换为可接受的数据
  function filterReg() {
    let regTmp: object[] = [];
    if (regData.length === 0) return [];
    regTmp = listData.filter(item => regData.some(num => num === item.id));
    return regTmp;
  }
  let showData =
    actListShow.registered === registeredState.registeredOnly
      ? filterReg()
      : listData;
  // 显示到屏幕上的数据，默认是所有,有两层逻辑，这里是第一层
  (() => {
    switch (
      actListShow.label // 根据标签选取特定数据，第二层
    ) {
      case actLabel.filmSalon:
        return (showData = showData.filter(act =>
          act.labels.find(l => l === actLabel.filmSalon),
        ));
      case actLabel.fridayCinema:
        return (showData = showData.filter(act =>
          act.labels.find(l => l === actLabel.fridayCinema),
        ));
      case actLabel.offline:
        return (showData = showData.filter(act =>
          act.labels.find(l => l === actLabel.offline),
        ));
      case actLabel.online:
        return (showData = showData.filter(act =>
          act.labels.find(l => l === actLabel.online),
        ));
      case actLabel.pictureBookStory:
        return (showData = showData.filter(act =>
          act.labels.find(l => l === actLabel.pictureBookStory),
        ));
      case actLabel.readingClub:
        return (showData = showData.filter(act =>
          act.labels.find(l => l === actLabel.readingClub),
        ));
      case actLabel.seniorSharingMeeting:
        return (showData = showData.filter(act =>
          act.labels.find(l => l === actLabel.seniorSharingMeeting),
        ));
      default:
        return showData;
    }
  })();
  const dispatch = useDispatch();
  const getPage = (label = 'text', page = 0, size = 6) => {
    dispatch(initList(label, page, size));
  };
  useEffect(() => {
    dispatch(changeLabel(actLabel.all)); // 初始化显示状态，获得第一页请求
    dispatch(initActShow());
    getPage();
  }, []);

  return (
    <div className="act-list-content">
      {clientWidth > 1100 ? (
        //这里面的props数据单纯是为了组件渲染，和控制数据无关
        <ActSortRadio listData={listData} regData={regData} />
      ) : (
        <div>
          <Affix className="act-label-affix">
            <MenuOutlined
              style={{
                fontSize: '22px',
                backgroundColor: 'white',
                width: '44px',
                height: '44px',
                boxShadow: '2px 0 8px rgba(0,0,0,.15)',
              }}
              onClick={() => {
                dispatch(changeDrawer());
              }}
            />
          </Affix>
          <Drawer
            width="200"
            placement="left"
            onClose={() => dispatch(changeDrawer())}
            closable={false}
            visible={actListShow.drawer}
          >
            <ActSortRadio listData={listData} regData={regData} />
          </Drawer>
        </div>
      )}
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
          dataSource={showData}
          renderItem={item => {
            return (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={
                    <a
                      onClick={() => {
                        showModal(item.id);
                      }}
                    >
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
                <div>{<Labels labels={item.labels} itemId={item.id} />}</div>
              </List.Item>
            );
          }}
        />
        {isDetailsVisible && (
          <Suspense fallback={<div>loading...</div>}>
            <ActivityDetail
              isDetailsVisible={isDetailsVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
              modalDetail={modalDetail}
            />
          </Suspense>
        )}
      </Card>
    </div>
  );
}

export default ActivityList;
