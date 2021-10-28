import React, { useEffect, useState } from 'react';
import { message, Space } from 'antd';
import './Activity.less';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '../../../reducers/actReducer';
import { lazy, Suspense } from 'react';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import { initActDetail } from '../../../reducers/actDetailReducer';
import { detailApi } from '../../../Services/activity';
import { RouterOptions } from '_@umijs_deps@3.5.15@@umijs/deps/compiled/express';

const ActivityDetail = lazy(() => import('./ActivityDetail')); //lazyload详情页面，保证首屏的速率
const RecentAct = lazy(() => import('../../../components/RecentAct'));

//活动列表页
function Activity(props: any) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  //const [modalDetail, setModalDetail] = useState({}); //把活动详情做成一个小对话框，用state控制其打开和关闭
  const modalDetail = useSelector((store: RootState) => store.actDetail);
  const showModal = (id: number) => {
    // dispatch(initActDetail(id)) 这里需要确保dispatch之后再setISdetail,用await不行，需要解耦合把action改成同步的。
    detailApi(id)
      .then(res => {
        dispatch(initActDetail(res.data));
        setIsDetailsVisible(true);
      })
      .catch(err => {
        console.log(err);
        message.error('Oops!发生了未知错误');
      });
  }; //这几个都是相应的控制活动的函数

  const handleOk = () => {
    setIsDetailsVisible(false);
  };

  const handleCancel = () => {
    setIsDetailsVisible(false);
  };
  const recent = useSelector((state: RootState) => state.act);
  const dispatch = useDispatch();
  const getRecentAct = () => {
    //把最近的活动拿到，暂时通过标签确定最近
    try {
      dispatch(initList('recent', 0, 20));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    //拿到活动，后执行宏任务拿到报名情况
    getRecentAct();
    //setRecent(recentlist)
  }, []);

  return (
    <Space direction="vertical" className="Activity .flex" size="large">
      <div
        className="Hero ant-layout-content"
        style={{ color: '@primary-color' }}
      >
        <h2 className="Hero-title">欢迎来到阅马活动系统</h2>
        <p>🏠华南师大图书馆————活动发布、报名、签到</p>
      </div>
      <Space direction="vertical" className="recent-Act" size="middle">
        {recent.length ? (
          <>
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
            <Suspense fallback={<Loading />}>
              <RecentAct recent={recent} showModal={showModal} />
            </Suspense>
          </>
        ) : (
          <EmptyState
            createTitle="创建活动"
            createDescription="暂时还没有活动哦"
            createFunc={() => {
              props.history.push('/home/adminAct/createact');
            }}
          />
        )}
      </Space>
      {isDetailsVisible && (
        <Suspense fallback={<div>loading...</div>}>
          {/* 代码拆分，当打开详情时导入加载详情页面 */}
          <ActivityDetail
            isDetailsVisible={isDetailsVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
            modalDetail={modalDetail}
          ></ActivityDetail>
        </Suspense>
      )}
    </Space>
  );
}

export default Activity;
