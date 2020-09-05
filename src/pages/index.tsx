import React from 'react';
import styles from './index.less';
import Frame from '../pages/Layout/Frame'
import store from '../reducers/store'
import {Provider} from 'react-redux'
export default (props:any) => {
  return (
    <Provider store={store}>
    <Frame>
      {props.children}
        
    </Frame>
    </Provider>
  );
}
