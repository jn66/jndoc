import React, { Component } from 'react'
import Header from '../../../components/Header'
import List from '../../../components/List'
import Footer from '../../../components/Footer'
import './water.css';

export default class index extends Component {
    //状态在哪里 操作状态发方法就在哪里
    state = {
        todos:[
            {
                id:'001',
                name:'内容',
                done:true
            },
            {
                id:'002',
                name:'内容666',
                done:false
            },
        ]
    }
    addToDo = (todoObj)=>{
        const {todos}  = this.state
        //追加一个todo 放最前方
        const newTodos = [todoObj,...todos]
        this.setState({todos:newTodos})
    }
    //拿过来数据 改一个 {old,new:1}
    updateToDo = (id,done)=>{
        const {todos} = this.state
        const newTodos = todos.map((todoObj)=>{
            if(todoObj.id === id) return {...todoObj,done}
            else return todoObj
        })
        this.setState({todos:newTodos})
    }

    handleDelete = (id)=>{
        const {todos} = this.state 
        const newTodos = todos.filter((item)=>{
            return item.id != id;
        })
        this.setState({todos:newTodos})
    }
    
    checkAllToDo = (done)=>{
        const {todos} = this.state 
        const newTodos = todos.map ((todoObj)=>{
            return {...todoObj, done}
        })
        this.setState({todos:newTodos})
    }

    clearAllDone = ()=>{
       // 获取原来的todos
       const {todos} = this.state 
       const newTodos  = todos.filter((todoObj)=>{
           return !todoObj.done
       })
       this.setState({todos:newTodos})
    }
    render() {
        console.log(this.updateToDo);
        return (
            <div>
                <Header addToDo={this.addToDo}/>
                <List  todos={this.state.todos} handleDelete={this.handleDelete}  updateTodo={this.updateToDo} />
                <Footer clearAllDone={this.clearAllDone} checkAllToDo = {this.checkAllToDo} todos = {this.state.todos} />
            </div>
        )
    }
}
