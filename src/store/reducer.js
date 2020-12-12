const initialState = {
    tasks: [],
    counter: 0,
    pending_counter: 0,
    completed_counter: 0
}

const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case 'ADD_TASK':
            {
                const new_task = {
                    title: action.payload.title, 
                    creation_date: action.payload.creation_date,
                    end_date: action.payload.end_date, 
                    detail: action.payload.detail,
                    status: 'pending',
                    id: state.counter+1
                }
                state.pending_counter += 1
                return{
                    ...state, 
                    tasks: [...state.tasks,new_task]
                }
            }
        case 'REMOVE_TASK':
            {   state.completed_counter -= 1
                state.counter -= 1
                return{
                    ...state,
                    tasks: [...state.tasks.slice(0, action.payload),
                        ...state.tasks.slice(action.payload + 1)]
                }
            }
        case 'EDIT_TASK':
            {   
                return{
                    ...state,
                    tasks: [...state.tasks.slice(0, action.payload.task_idx),
                        action.payload.new_value,
                        ...state.tasks.slice(action.payload.task_idx + 1)]
                }
            }
        case 'CHANGE_STATUS':
            {   
                if(action.payload.new_value.status === 'pending'){
                    state.pending_counter += 1
                    state.completed_counter -= 1
                }
                else{
                    state.pending_counter -= 1
                    state.completed_counter += 1
                }
                return{
                    ...state,
                    tasks: [...state.tasks.slice(0, action.payload.task_idx),
                        action.payload.new_value,
                        ...state.tasks.slice(action.payload.task_idx + 1)]
                }
            }
        case 'ADD_FROM_LS':
            {
                return action.payload
            }
        default:
            return state
    }
}

export default reducer