import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import './index.css'
class Header extends Component {
    //对接收的props进行：类型、必要性的限制
    static propTypes={
        addTodo:PropTypes.func.isRequired
    }
    //键盘事件的判断
    handleKeyUp=(event)=>{
        //结构赋值获取keyCode,target
        const{keyCode,target}=event
        //判断是否是回车按键
        if(keyCode!==13){
            return
        }else{
            //添加的todo名字不能为空
            if(target.value.trim()===''){
                alert('输入不能为空')
                return
            }
            //准备好一个todo对象
            const todoObj={
                id:nanoid(),
                name:target.value,
                done:false
            }
            //清空输入
            target.value=''
            //将todoObj传递给App
            this.props.addTodo(todoObj)
        }
    }
    render() {
        return (
            <div className="todo-header">
                <input type="text" placeholder="请输入你的任务名称，按回车键确认" onKeyUp={this.handleKeyUp}/>
            </div>
        );
    }
}

export default Header;
