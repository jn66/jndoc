import React, { Component } from 'react'

export default class index extends Component {
    //全选checkbox的回调
    handleCheckAll = (event)=>{
        this.props.checkAllToDo(event.target.checked)
    }
    //清除所有已经完成的
    handleClearAllDone = ()=>{
        this.props.clearAllDone()
    }
    render() {
        const {todos} = this.props
        const doneCount = todos.reduce((pre,todo)=>{
            return pre + (todo.done?1:0)
        },0)
        const total = todos.length
        return (
            <div>
                <div style={{borderTop:'1px solid #e0e0e0',paddingTop:'10px',display:'flex',justifyContent: 'space-between',alignItems:'center'}}>
                    <div>
                        {/* 这个用default checked不顶用 只在第一次起作用 checked可以指定多次 但是得需要onchange，不然改不了*/}
                        {/* 相等且总数不等于0 */}
                        <input onChange={this.handleCheckAll} checked={doneCount ===total && total !==0 ? true : false} type="text" type="checkbox"/>  已经完成{doneCount} 全部{total}
                    </div>
                    <button onClick = {this.handleClearAllDone}>清除掉已经完成的任务</button>
                </div>
            </div>
        )
    }
}
