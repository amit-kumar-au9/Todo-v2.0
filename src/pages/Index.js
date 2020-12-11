import React from 'react'
import Navbar from '../components/Navbar'
import AddTodo from '../components/AddTodo'
import OnGoingTask from '../components/OnGoingTask'
import CompletedTask from '../components/CompletedTask'
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
                    payload: [element.title, element.end_date, element.detail]
                })
            });
        }
    }

    componentDidUpdate(){
        localStorage.setItem("all_tasks",JSON.stringify(this.props.tasks));
    }
    
    render(){
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
                                <hr/>
                                <div className="scroll_card">
                                    {
                                        this.props.tasks.map((task,idx) => {
                                            return (
                                                <OnGoingTask task_value={task} key={idx} id={idx}/>
                                                )
                                            })
                                        }
                                </div>
                            </div>
                        </div>
                        <div className="card text-center">
                            <div className="card-body">
                                <h2>Completed</h2>
                                <hr/>
                                <div className="scroll_card">
                                    {
                                        this.props.tasks.map((task,idx) => {
                                            return (
                                                <CompletedTask task_value={task} key={idx} id={idx}/>
                                                )
                                            })
                                        }
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
        tasks : state.tasks
    }
}

export default connect(mapStateToProps)(Index);