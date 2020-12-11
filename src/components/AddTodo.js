import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/add-todo.css'
import { STORE_ACTION} from '../actions'

class AddTodo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            new_task_title: '',
            new_task_date: '',
            new_task_details: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    pushTasks = (e) =>{
        e.preventDefault()
        const task_arr = [this.state.new_task_title, this.state.new_task_date, this.state.new_task_details]
        if (task_arr[0] && task_arr[1] && task_arr[2]){
            this.props.dispatch({
                type: STORE_ACTION.ADD,
                payload: task_arr
            })
        }
        this.setState({
            new_task_title: '',
            new_task_date: '',
            new_task_details: ''
        })
    }
    
    render(){
        return(
            <div className="card add-task-card">
                <div className="card-body">
                    <h2 className="text-center">Let's start</h2>
                    <hr/>
                    <form onSubmit={this.pushTasks}>
                        <div className="row">
                            <div className="col-12">
                                <label>Task Title: </label> <small>{this.state.error && this.state.errorMsg}</small>
                                <input className="form-control" type="text" value={this.state.new_task_title} name="new_task_title" placeholder="Enter the task" onChange={this.onChangeHandler} required/>
                            </div>
                            <div className="col-12">
                                <hr/>
                                <label>End Date: </label>
                                <input className="form-control" type="date" value={this.state.new_task_date} name="new_task_date" onChange={this.onChangeHandler} required/>
                            </div>
                            <div className="col-12">
                                <hr/>
                                <label>Task Details: </label>
                                <textarea className="form-control" rows="2" placeholder="Enter the details" value={this.state.new_task_details} name="new_task_details" onChange={this.onChangeHandler} required></textarea>
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