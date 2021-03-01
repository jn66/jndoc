import React, { Component } from 'react'

export default class Header extends Component {
    // 进行类型必要性性质 而且得引入propType库
    // static propTypes = {
    //     addTodo: this.propTypes.func.isRequired
    // }
    
    handleKeyUp = (event)=>{
        const  {keyCode, target} = event;

        //判断是否是回车
        if(keyCode !== 13) return;
        if(target.value.trim()===''){
            alert('输入不能空');
            return 
        }
        //准备好一个todo对象  Math.random() Date.now() 
        console.log(target.value);
        const todoObj = {id:Math.random(),name:target.value,done:true}
        this.props.addToDo(todoObj);
        target.value = '';
    }

    render() {
        return (
            <div>
                <div style={{color:'red'}}>
                    <input onKeyUp={this.handleKeyUp}  type="text" placeholder="请输入内容" />
                </div>
            </div>
        )
    }
}
