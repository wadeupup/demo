//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom/client'
//引入App
import App from './App'
import store from './redux/store'
import {Provider} from 'react-redux'
// store.subscribe(()=>{
const root = ReactDOM.createRoot(document.getElementById('root'));

// })
root.render(<Provider store={store}><App/></Provider>)
// store.subscribe(()=>{
//   root.render(<App/>)
// }
// )