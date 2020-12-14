import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/TaskCard.css'
import { STORE_ACTION } from '../actions'

// const bg_colors = [
//   'linear-gradient(225deg, hsla(354, 71%, 45%, 1) 0%, hsla(354, 82%, 70%, 1) 100%)', //red
//   'linear-gradient(225deg, hsla(210, 10%, 23%, 1) 0%, hsla(210, 6%, 45%, 1) 100%)', //black
//   'linear-gradient(225deg, hsla(28, 100%, 52%, 1) 0%, hsla(45, 84%, 66%, 1) 100%)', //orange
//   'linear-gradient(225deg, hsla(79, 68%, 46%, 1) 0%, hsla(169, 100%, 48%, 1) 100%)', //light green
//   'linear-gradient(225deg, hsla(156, 100%, 37%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //green
//   'linear-gradient(225deg, hsla(185, 100%, 29%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //dark green
//   'linear-gradient(225deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //blue
//   'linear-gradient(225deg, hsla(320, 66%, 45%, 1) 0%, hsla(339, 73%, 72%, 1) 100%)' //pink
// ];

// const line_colors = [
//   '#C72838', //red
//   '#3A4046', //black
//   '#FC8B1A', //orange
//   '#78CE44', //light green
//   '#05C07C', //green
//   '#058F9C', //dark green
//   '#056CFE', //blue
//   '#C43290' //pink
// ];

const bg_colors = [
  'linear-gradient(225deg, hsla(320, 66%, 45%, 1) 0%, hsla(339, 73%, 72%, 1) 100%)', //pink
  'linear-gradient(225deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //blue
  'linear-gradient(225deg, hsla(185, 100%, 29%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //dark green
  'linear-gradient(225deg, hsla(156, 100%, 37%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)', //green
  'linear-gradient(225deg, hsla(79, 68%, 46%, 1) 0%, hsla(169, 100%, 48%, 1) 100%)', //light green
  'linear-gradient(225deg, hsla(28, 100%, 52%, 1) 0%, hsla(45, 84%, 66%, 1) 100%)', //orange
  'linear-gradient(225deg, hsla(210, 10%, 23%, 1) 0%, hsla(210, 6%, 45%, 1) 100%)', //black
  'linear-gradient(225deg, hsla(354, 71%, 45%, 1) 0%, hsla(354, 82%, 70%, 1) 100%)' //red
];

const line_colors = [
  '#C43290', //pink
  '#056CFE', //blue
  '#058F9C', //dark green
  '#05C07C', //green
  '#78CE44', //light green
  '#FC8B1A', //orange
  '#3A4046', //black
  '#C72838' //red
];

class CompletedTask extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      row_no: 2
    }
  }

  popTasks = () => {
    this.props.dispatch({
      type: STORE_ACTION.REMOVE,
      payload: this.props.id
    })
  }

  onChangeHandler = (key,value) => {
    this.setState({
      [key] : value
    })
  }

  editStatus = () => {
    this.props.dispatch({
      type: STORE_ACTION.CHANGE_STATUS,
      payload:{ 
        task_idx: this.props.id, 
        new_value: {
          title : this.props.task_value.title,
          creation_date: this.props.task_value.creation_date,
          end_date: this.props.task_value.end_date,
          detail: this.props.task_value.detail,
          status: 'pending',
          id: this.props.task_value.id
        }
      }
    })
  }

  index = this.props.task_value.id % bg_colors.length

  render(){
    const card_color = {
      color: "white",
      background: bg_colors[this.index]
    };
    const hr_color = {
      backgroundColor: line_colors[this.index],
      height: '1px'
    };

    return(
      <>
        <div className="task-card" style={card_color}>
          <div className="task-action">
            <i className="fa fa-reply text-success bg-white" onClick={this.editStatus} aria-hidden="true"></i>
            {this.state.row_no === 2 && <i className="text-secondary bg-white fa fa-chevron-down" onClick={() => this.onChangeHandler('row_no', 4)} aria-hidden="true"></i> }
            {this.state.row_no > 2 && <i className="text-secondary bg-white fa fa-chevron-up" onClick={() => this.onChangeHandler('row_no', 2)} aria-hidden="true"></i>}
            <i className="fa fa-trash text-danger bg-white" onClick={this.popTasks} aria-hidden="true"></i>
          </div>
          <input type="text" value={this.props.task_value.title} readOnly required/>
          <textarea className="text-capitalize" rows={this.state.row_no} value={this.props.task_value.detail} readOnly>
          </textarea>
          <div className="row date_container">
            <div className="col-7">
              <label className="pl-3">End Date: </label>
              {/* <label>{this.props.task_value.end_date}</label> */}
              <input type="textarea" value={this.props.task_value.end_date} required readOnly/>

            </div>
            <div className="col-5">
              <label>Created on:</label>
              <label>{this.props.task_value.creation_date}</label>
            </div>
          </div>
        </div>
        <hr style={hr_color}/>
      </>
    )
  }
}

export default connect()(CompletedTask);
