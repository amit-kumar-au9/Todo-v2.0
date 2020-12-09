import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/add-todo.css'
import { STORE_ACTION} from '../actions'

class AddTodo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            new_task: '',
            error: false,
            errorMsg: 'Task Title Already Exists'
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            new_task: e.target.value
        })
    }

    pushTasks = (e) =>{
        e.preventDefault()
        const error = (this.props.tasks.indexOf(this.state.new_task) === -1)
        if (error){
            if (this.state.new_task){
                this.props.dispatch({
                    type: STORE_ACTION.ADD,
                    payload: this.state.new_task
                })
            }
            this.setState({
                ...this.state,
                error: false,
                new_task: ''
            })
        }
        else{
            this.setState({
                ...this.state,
                error: true,
                new_task: ''
            })
        }
    }
    
    render(){
        return(
            <div className="card add-task-card">
                <div className="card-body">
                    <h2 className="text-center">Task To Do</h2>
                    <hr/>
                    <form onSubmit={this.pushTasks}>
                        <div className="row">
                            <div className="col-12">
                                <label>Task Title: </label> <small>{this.state.error && this.state.errorMsg}</small>
                                <input className="form-control" type="text" value={this.state.new_task} name="value" placeholder="Enter the task" onChange={this.onChangeHandler}/>
                            </div>
                            <div className="col-12">
                                <hr/>
                                <label>End Date: </label>
                                <input className="form-control" type="date"/>
                            </div>
                            <div className="col-12">
                                <hr/>
                                <label>Task Details: </label>
                                <textarea className="form-control" rows="2" placeholder="Enter the details"></textarea>
                                <hr/>
                            </div>
                        </div>
                        <center>
                            <button className="btn btn-dark add-todo-btn" type="submit">ADD</button>
                        </center>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        tasks : state.tasks
    }
}
export default connect(mapStateToProps)(AddTodo);