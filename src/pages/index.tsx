import React from 'react';
import styles from './index.less';
import Frame from './Layout/Frame';
import { Provider } from 'react-redux';
import store from '../store';
import { getnotifyApi } from '../Services/auth';
import { getUserID } from '@/Utils/auth';

export default (props: any) => {
  return (
    <Provider store={store}>
      <Frame>{props.children}</Frame>
    </Provider>
  );
};
