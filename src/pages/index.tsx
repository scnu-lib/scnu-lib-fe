import React from 'react';
import styles from './index.less';
import Frame from '../pages/Layout/Frame'
import {Provider} from 'react-redux'
import store from '../store'
import {getnotifyApi} from '../Services/auth'
import { getUserID } from '@/Utils/auth';
import unhandleRejection from '../robustness/unhandleRejection'

unhandleRejection()

export default (props:any) => {
  return (
    <Provider store={store}>
    <Frame>
      {props.children}
        
    </Frame>
    </Provider>
  );
}
