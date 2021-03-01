import React, { Component } from 'react'
import Item from  '../Item'
export default class List extends Component {
    render() {
        const {todos, updateTodo,handleDelete} =this.props;
        console.log(updateTodo,111);
        return (
            <div>
                {/* <Item todo={{id: "001", name: "内容", done: true}} /> */}

                {
                    todos.map((todo)=>{
                        // return <Item key={todo.id} id={todo.id} name={todo.name} done={todo.done} />
                        return <Item key={todo.id} {...todo} handleDelete={handleDelete}  updateTodo = {updateTodo} />
                    })
                }
            </div>
        )
    }
}
