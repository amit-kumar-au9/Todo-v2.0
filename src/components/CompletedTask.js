import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/CompletedTask.css'
import { STORE_ACTION} from '../actions'

class CompletedTask extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      task_title : this.props.task_value
    }
  }

  popTasks = () => {
    this.props.dispatch({
      type: STORE_ACTION.REMOVE,
      payload: this.props.id
    })
  }

  editTasks = (e) => {
    this.props.dispatch({
      type: STORE_ACTION.EDIT,
      payload:{ task_idx: this.props.id, new_value: e.target.value }
    })
  }

  onChangeHandler = (e) => {
    const key = e.target.name
    const value = e.target.value
    this.setState({
      [key] : value
    })
  }

  
  colors = ['#28A745', '#DC3545', '#FFC107', '#17A2B8', '#343A40', '#007BFF', '#6C757D']
  index = this.props.id % this.colors.length
  
  render(){
    const card_color = {
      color: "white",
      backgroundColor: this.colors[this.index]
    };
    const hr_color = {
      backgroundColor: this.colors[this.index],
      height: '1px',
      marginRight: '10px'
    };

    return(
      <>
        <div className="task-card" style={card_color}>
          <div>
            <i className="task-action fa fa-trash text-danger bg-white" onClick={this.popTasks} aria-hidden="true"></i>
            <i className="task-action fa fa-refresh text-primary bg-white" aria-hidden="true"></i>
            <i className="task-action fa fa-check text-warning bg-white" aria-hidden="true"></i>
            <i className="task-action fa fa-pencil-square-o text-success bg-white" onClick={this.editTasks} aria-hidden="true"></i>
          </div>
          <textarea className="card-textarea" name="task_title" value={this.props.task_value} onChange={this.onChangeHandler}>
            {this.props.task_value}
          </textarea>
        </div>
        <hr style={hr_color}/>
      </>
    )
  }
}

export default connect()(CompletedTask);
