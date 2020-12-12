import React from 'react'
import {connect} from 'react-redux'
import '../assets/css/TaskCard.css'
import { STORE_ACTION} from '../actions'

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

class OnGoingTask extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title : this.props.task_value.title,
      end_date: this.props.task_value.end_date,
      detail: this.props.task_value.detail,
      row_no: 2
    }
  }

  editTasks = () => {
    this.props.dispatch({
      type: STORE_ACTION.EDIT,
      payload:{ 
        task_idx: this.props.id, 
        new_value: {
          title : this.state.title,
          end_date: this.state.end_date,
          detail: this.state.detail,
          status: this.props.task_value.status,
          id: this.props.task_value.id
        } 
      }
    })
  }

  editStatus = () => {
    this.props.dispatch({
      type: STORE_ACTION.CHANGE_STATUS,
      payload:{ 
        task_idx: this.props.id, 
        new_value: {
          title : this.props.task_value.title,
          end_date: this.props.task_value.end_date,
          detail: this.props.task_value.detail,
          status: 'completed',
          id: this.props.task_value.id
        }
      }
    })
  }

  onChangeHandler = (key, value) => {
    this.setState({
      [key] : value
    })
    this.editTasks('pending')
  }

  index = this.props.id % bg_colors.length
  
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
          <div className="container">
            <div className="row">
              <div className="col-8">
                <input type="text" name="title" maxLength="40" value={this.state.title} onChange={(e) => this.onChangeHandler(e.target.name, e.target.value)} required/>
              </div>
              <div className="col-4">
                <i className="task-action fa fa-check text-success bg-white" onClick={this.editStatus} aria-hidden="true"></i>
                {this.state.row_no === 2 && <i className="task-action text-secondary bg-white fa fa-chevron-down" onClick={() => this.onChangeHandler('row_no', 4)} aria-hidden="true"></i> }
                {this.state.row_no > 2 && <i className="task-action text-secondary bg-white fa fa-chevron-up" onClick={() => this.onChangeHandler('row_no', 2)} aria-hidden="true"></i>}
                {/* <i className="task-action fa fa-spinner text-primary bg-white fa-spin" aria-hidden="true"></i> */}
              </div>
            </div>
          </div>
          <textarea className="card-textarea" rows={this.state.row_no} name="detail" value={this.state.detail} onChange={(e) => this.onChangeHandler(e.target.name, e.target.value)} required>
            {this.state.detail}
          </textarea>
          <input type="date" name="end_date" value={this.state.end_date} onChange={(e) => this.onChangeHandler(e.target.name, e.target.value)} required/>
        </div>
        <hr style={hr_color}/>
      </>
    )
  }
}

export default connect()(OnGoingTask);
