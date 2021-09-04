import React from 'react';
import Frame from './Layout/Frame';
import { Provider } from 'react-redux';
import store from '../store';
export default (props: any) => {
  return (
    <Provider store={store}>
      <Frame>{props.children}</Frame>
    </Provider>
  );
};
