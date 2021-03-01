import React, { Component } from 'react'

export default class Item extends Component {
    state = {mouse:false}
    // 鼠标移动进去flag为true 通过flag设置样式
    handleMouse = (flag)=>{
        return ()=>{
            this.setState({mouse:flag});
        }
    }
    // 勾选或者取消勾选 获取id和选中状态
    handleCheck = (id)=>{
        return (event)=>{
            this.props.updateTodo(id,event.target.checked);
            // console.log(this.props);
        }
    }

    //这里不用高阶函数 加window 就没坑
    handleDelete = (id)=>{
        if(window.confirm('确定删除？')==true){
            this.props.handleDelete(id);
        }
        
    }
    render() {
        const {id,name,done} = this.props;
        return (
            <div style={{height:'60px',backgroundColor:this.state.mouse?'#ddd':'white',display:'flex',justifyContent: 'space-between',alignItems:'center'}} onMouseLeave={this.handleMouse(false)} onMouseEnter={this.handleMouse(true)} >
                <div>
                    {/* 这里不能写defaultchecked了 只有第一次生效 */}
                    <input type="text" type="checkbox" checked={done} onChange={this.handleCheck(id)}/>  
                    {name}
                </div>
                <button onClick={(event)=>this.handleDelete(id)} style={{display:this.state.mouse?'block':'none'}}>删除</button>
            </div>
        )
    }
}
