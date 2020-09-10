import {createStore, applyMiddleware} from 'redux'

import userReducer from './reducers/userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const store = createStore(userReducer,composeWithDevTools(applyMiddleware(thunk)))
console.log(store.getState())
store.subscribe(()=>console.log(store.getState()))

export default store