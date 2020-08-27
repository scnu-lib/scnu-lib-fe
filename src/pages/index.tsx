import React from 'react';
import styles from './index.less';
import Frame from '../pages/Layout/Frame'
export default (props:any) => {
  return (
    <Frame>
      {props.children}
        
    </Frame>
  );
}
