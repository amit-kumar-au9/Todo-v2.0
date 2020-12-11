import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/add-todo.css'
import { STORE_ACTION} from '../actions'

const today_date = new Date()
const month = today_date.getMonth()+1
var curr = today_date.getFullYear() + '-' + month + '-' + today_date.getDate()

class AddTodo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            end_date: curr,
            detail: "",
            error_msg:{ title_length_msg: 'It cannot contain more than 40 character' },
            title_length_error: false
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            title_length_error: false
        })
        if(this.state.title.length >= 39){
            this.setState({
                title_length_error: true
            })
        }
    }

    componentDidMount(){
        this.setState({
            end_date: curr
        })
    }

    pushTasks = (e) =>{
        e.preventDefault()
        const task_arr = [this.state.title, this.state.end_date, this.state.detail, 'pending']
        if (task_arr[0] && task_arr[1] && task_arr[2]){
            this.props.dispatch({
                type: STORE_ACTION.ADD,
                payload: task_arr
            })
        }
        this.setState({
            title: '',
            end_date: curr,
            detail: ""
        })
    }
    
    render(){
        return(
            <div className="card add-task-card">
                <div className="card-body">
                    <h2 className="text-center" data-text="Let's start..." >Let's start...</h2>
                    <hr className="hr_black"/>
                    <form onSubmit={this.pushTasks}>
                        <div className="row">
                            <div className="col-12 mt-1">
                                <label>Task Title: </label> <small>{this.state.error && this.state.errorMsg}</small>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    value={this.state.title} 
                                    name="title" 
                                    maxLength="40"
                                    placeholder="Enter the task" 
                                    onChange={this.onChangeHandler} 
                                    required
                                />
                                <small className="text-danger">{this.state.title_length_error && this.state.error_msg.title_length_msg}</small>
                            </div>
                            <div className="col-12 mt-1">
                                <label>End Date: </label>
                                <input 
                                    className="form-control" 
                                    type="date" 
                                    value={this.state.end_date} 
                                    name="end_date" 
                                    onChange={this.onChangeHandler} 
                                    required
                                />
                            </div>
                            <div className="col-12 mt-1">
                                <label>Task Details: </label>
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    placeholder="Enter the details" 
                                    value={this.state.detail} 
                                    name="detail" 
                                    onChange={this.onChangeHandler} 
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <center>
                            <button className="btn btn-dark add-todo-btn mt-2" type="submit">ADD</button>
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