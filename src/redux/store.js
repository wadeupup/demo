// import { configureStore } from '@reduxjs/toolkit'

// export default configureStore({
//   reducer: {}
// })、
// 引入createStore.专门用于创建redux中最核心的store对象
import { applyMiddleware, createStore } from 'redux'
// 引入为Count组件服务的reducer
import countReducer  from'./count_reducer'
// 引入redux-thunk用于支持异步action
import thunk from 'redux-thunk'
// 暴露store
export default createStore(countReducer,applyMiddleware(thunk))
