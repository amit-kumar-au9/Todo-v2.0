import React from 'react'
import Navbar from '../components/Navbar'
import AddTodo from '../components/AddTodo'
import OnGoingTask from '../components/OnGoingTask'
import CompletedTask from '../components/CompletedTask'
import EmptyTask from '../components/EmptyTask'
import Footer from '../components/Footer'
import {connect} from 'react-redux'
import { STORE_ACTION} from '../actions'
import '../assets/css/index.css'

class Index extends React.Component{

    componentDidMount = () =>{
        const all_tasks = JSON.parse(localStorage.getItem("all_tasks"))
        if (all_tasks && (this.props.tasks.length === 0)){
            all_tasks.forEach(element => {
                this.props.dispatch({
                    type: STORE_ACTION.ADD,
                    payload: [element.title, element.end_date, element.detail, element.status]
                })
            });
        }
    }

    componentDidUpdate(){
        localStorage.setItem("all_tasks",JSON.stringify(this.props.tasks));
    }
    
    render(){
        var on_going_task = ''
        if (this.props.pending_counter > 0 ){
            on_going_task = this.props.tasks.map((task,idx) => {
                                return ( task.status === 'pending' &&
                                    <OnGoingTask task_value={task} key={idx} id={idx}/>
                                    )
                                })
        }
        else{
            on_going_task = <EmptyTask text="No pending task. Create One" index="0"/>
        }

        var completed_task = ''
        if (this.props.completed_counter > 0 ){
            completed_task = this.props.tasks.map((task,idx) => {
                                return ( task.status === 'completed' &&
                                    <CompletedTask task_value={task} key={idx} id={idx}/>
                                    )
                                })
        }
        else{
            completed_task = <EmptyTask text="Your completed task will look here" index="1"/>
        }

        console.log(this.props.tasks)
        return(
            <>  
                <Navbar/>
                <div className="main-outer-container">
                    <div className="add-task-container">
                        <AddTodo/> 
                    </div>
                    <div className="current-task-container">
                        <div className="card text-center">
                            <div className="card-body">
                                <h2>Pending</h2>
                                <hr className="hr_black"/>
                                <div className="scroll_card mt-2">
                                    {on_going_task}
                                </div>
                            </div>
                        </div>
                        <div className="card text-center">
                            <div className="card-body">
                                <h2>Completed</h2>
                                <hr className="hr_black"/>
                                <div className="scroll_card mt-2">
                                    {completed_task}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        tasks : state.tasks,
        pending_counter: state.pending_counter,
        completed_counter: state.completed_counter,
    }
}

export default connect(mapStateToProps)(Index);