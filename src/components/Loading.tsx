import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;
export default () => {
  return <Spin indicator={antIcon} tip='页面正在加载中...'/>;
}