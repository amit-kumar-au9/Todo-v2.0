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
        const store = JSON.parse(localStorage.getItem("store"))
        if (store && (store.tasks.length !== 0)){
            this.props.dispatch({
                type: STORE_ACTION.LOCAL_STORAGE,
                payload: store
            })
        }
    }

    componentDidUpdate(){
        localStorage.setItem("store",JSON.stringify(this.props.store));
    }
    
    render(){
        var on_going_task = ''
        if (this.props.store.pending_counter > 0 ){
            on_going_task = this.props.store.tasks.map((task,idx) => {
                                return ( task.status === 'pending' &&
                                    <OnGoingTask task_value={task} key={idx} id={idx}/>
                                    )
                                })
        }
        else{
            on_going_task = <EmptyTask text="No pending task. Create One" index="0"/>
        }

        var completed_task = ''
        if (this.props.store.completed_counter > 0 ){
            completed_task = this.props.store.tasks.map((task,idx) => {
                                return ( task.status === 'completed' &&
                                    <CompletedTask task_value={task} key={idx} id={idx}/>
                                    )
                                })
        }
        else{
            completed_task = <EmptyTask text="Your completed task will look here" index="1"/>
        }

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
        store : state
    }
}

export default connect(mapStateToProps)(Index);