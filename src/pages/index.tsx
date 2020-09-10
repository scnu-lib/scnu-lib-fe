import React from 'react';
import styles from './index.less';
import Frame from '../pages/Layout/Frame'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import userReducer,{changeUserinfo} from '../reducers/userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {getnotifyApi} from '../Services/auth'
import { getUserID } from '@/Utils/auth';
import unhandleRejection from '../robustness/unhandleRejection'
const store = createStore(userReducer,composeWithDevTools())
unhandleRejection()
console.log(store.getState())
store.subscribe(()=>console.log(store.getState()))

export default (props:any) => {
  return (
    <Provider store={store}>
    <Frame>
      {props.children}
        
    </Frame>
    </Provider>
  );
}
