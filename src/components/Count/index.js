// import React, { Component } from 'react'

// export default class Count extends Component {
//   render() {
//     return (
//       <Count/>
//     )
//   }
// }
import React, { Component } from 'react'
import { createDecrementAction, createIncrementAction,createIncrementAsyncAction } from '../../redux/count_action'
import { connect } from 'react-redux'
//引入store
// import store from '../../redux/store'
// import {createIncrementAction, createDecrementAction,createIncrementAsyncAction} from '../../redux/count_action'

 class CountUI extends Component {
  state={carName:'奔驰c63'}
  componentDidMount(){
    //监测redux中状态的变化，只要变化，就调用render
    // store.subscribe(()=>{
    //   this.setState({})
    // })
  }
  //加法
  increment=()=>{
  const {value} = this.selectNumber
  this.props.jia(value*1)
  // const {count} = this.state
  // const temp ={value:value,name:2}
  // store.dispatch(createIncrementAction(value*1))
  // this.setState({count:count+value*1})
  }
  // 减法
  decrement=()=>{
   const {value}=this.selectNumber
   this.props.jian(value*1)
  //  store.dispatch(createDecrementAction(value*1))
  //  const {count}=this.state
  //  this.setState({count:count-value*1})
  }
  // 奇数相加
  incrementIfOdd=()=>{
   const {value} = this.selectNumber
  //  const {count} = this.state
   const count =this.props.count
   if(count%2!==0){
    this.props.jia(value*1,500)
    // store.dispatch(createIncrementAction(value*1))
    // store.dispatch({type:'increment',data:value*1})
    //  this.setState({count:count+value*1})
   }
  }
  // 异步相加
  incrementAsync=()=>{
  const {value}=this.selectNumber
  this.props.jiaAsync(value*1,500)
  // const {count} = this.state
  // setTimeout(()=>{
  //   // store.dispatch(createIncrementAsyncAction(value*1))
  //   // store.dispatch({type:'increment',data:value*1})
  //   // this.setState({count:count+value*1})
  // },200)
  }
  render() {
    // const {todos,updateTodo,deleteTodo}=this.props;
    return (<div>
      {/* <h1>当前求和{store.getState()}</h1> */}
      <h1>当前求和{this.props.count}</h1>
      <select ref={c=>this.selectNumber=c}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>
      <button onClick={this.incrementAsync}>异步加</button>
    </div>)
}
}
export default connect(state => ({ count: state }), { jia: createIncrementAction, jian: createDecrementAction, jiaAsync: createIncrementAsyncAction })(CountUI)

