import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/TaskCard.css'
import { STORE_ACTION } from '../actions'

const bg_colors = [
  'linear-gradient(225deg, hsla(354, 71%, 45%, 1) 0%, hsla(354, 82%, 70%, 1) 100%)', //red
  'linear-gradient(225deg, hsla(210, 10%, 23%, 1) 0%, hsla(210, 6%, 45%, 1) 100%)', //black
  'linear-gradient(225deg, hsla(28, 100%, 52%, 1) 0%, hsla(45, 84%, 66%, 1) 100%)', //orange
  'linear-gradient(225deg, hsla(79, 68%, 46%, 1) 0%, hsla(169, 100%, 48%, 1) 100%)', //light green
  'linear-gradient(225deg, hsla(156, 100%, 37%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //green
  'linear-gradient(225deg, hsla(185, 100%, 29%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //dark green
  'linear-gradient(225deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //blue
  'linear-gradient(225deg, hsla(320, 66%, 45%, 1) 0%, hsla(339, 73%, 72%, 1) 100%)' //pink
];

const line_colors = [
  '#C72838', //red
  '#3A4046', //black
  '#FC8B1A', //orange
  '#78CE44', //light green
  '#05C07C', //green
  '#058F9C', //dark green
  '#056CFE', //blue
  '#C43290' //pink
];

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

  index = this.props.id % bg_colors.length
  
  render(){
    const card_color = {
      color: "white",
      background: bg_colors[this.index]
    };
    const hr_color = {
      backgroundColor: line_colors[this.index],
      height: '1px',
      // marginRight: '10px'
    };

    return(
      <>
        <div className="task-card" style={card_color}>
          <div>
            <i className="task-action fa fa-trash text-danger bg-white" onClick={this.popTasks} aria-hidden="true"></i>
            <i className="task-action fa fa-pencil-square-o text-dark bg-white" onClick={this.editTasks} aria-hidden="true"></i>
            <i className="task-action fa fa-check text-success bg-white" aria-hidden="true"></i>
            <i className="task-action fa fa-refresh text-primary bg-white" aria-hidden="true"></i>
          </div>
          <textarea className="card-textarea" rows="4" name="task_title" value={this.props.task_value} onChange={this.onChangeHandler}>
            {this.props.task_value}
          </textarea>
        </div>
        <hr style={hr_color}/>
      </>
    )
  }
}

export default connect()(CompletedTask);
