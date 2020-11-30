import { createStore, applyMiddleware, combineReducers } from 'redux';
import usermReducer from '@/reducers/usermReducer';
import userReducer from './reducers/userReducer';
import actReducer from './reducers/actReducer';
import actDetailReducer from '@/reducers/actDetailReducer';
import actParticipantsReducer from '@/reducers/actParticipantsReducer';
import userSettingReducer from '@/reducers/userSettingReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
const reducer = combineReducers({
  act: actReducer,
  user: userReducer,
  userList: usermReducer,
  userSetting: userSettingReducer,
  actParticipants: actParticipantsReducer,
  actDetail: actDetailReducer,
}); // 组合reducer，act字段和user字段分别管理不同的store
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

export default store;
