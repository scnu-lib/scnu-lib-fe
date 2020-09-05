import UserReducer from '../reducers/UserReducer'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(UserReducer,composeWithDevTools(applyMiddleware(thunk)))

//异步action创造器，为了把req异步操作整合到actioncreator中，使用redux-thunk中间件，
//此后可以用async await方法返回创建一个actioncreator函数，返回函数传入传输为dispatch
export default store