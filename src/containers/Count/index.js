// 引入count的值
import CountUI from '../../components/Count'

//引入store
// import store from '../../redux/store'
//引入connect用于链接UI组件与redux
import { connect } from 'react-redux'
///mapStateToProps返回的是一个对象，
// 返回的对象中的key就作为传递给ui组件props的key，
// value就作为传递给ui组件props的value--状态值
// 
// function mapStateToProps(state){
//   return {count:state}
// }
// const mapStateToProps =(state)=>({count:state})
//---操作状态的方法
// function mapDispathToProps(dispatch){
//   return {jia:(number)=>{
//     //通知redux执行加法
//     dispatch(createIncrementAction(number))
//   },
//   jian:(number)=>{
//     //通知redux执行加法
//     dispatch(createDecrementAction(number))
//   },
//   jiaAsync:(number,time)=>{
//     //通知redux执行加法
//     dispatch(createIncrementAsyncAction(number,time))
//   },
// }
// }
//使用connect()创建并暴露一个Count的容器组件
// export default connect(mapStateToProps,mapDispathToProps)(CountUI)
//mapDispathToProps的简写action自动分发
export default connect(state => ({ count: state }), { jia: createIncrementAction, jian: createDecrementAction, jiaAsync: createIncrementAsyncAction })(CountUI)