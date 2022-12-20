//rr
// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }
// 1.该文件适用于创建一个为count组件服务的reducer，reducer的本质就是一个函数
// 2.reducer函数会接到两个参数，分别为之前的状态prestate，动作对象action
import {INCREMENT,DECREMENT} from './constant'
export default function counterReducer(state={value:0},action){
  console.log(state)
  const {type,data} = action
 switch(type){
  case INCREMENT:
    return state+data
  case DECREMENT:
    return state-data
  default:
    return 30
}
}