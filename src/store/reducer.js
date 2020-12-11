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
            const new_task = {
                title: action.payload[0], 
                end_date: action.payload[1], 
                detail: action.payload[2],
                status: action.payload[3],
                id: state.counter++
            }
            state.pending_counter++
            return{
                ...state, 
                tasks: [...state.tasks,new_task]
            }
        case 'REMOVE_TASK':
            {   state.completed_counter--
                return{
                    ...state,
                    tasks: [...state.tasks.slice(0, action.payload),
                        ...state.tasks.slice(action.payload + 1)]
                }
            }
        case 'EDIT_TASK':
            {   if(action.payload.new_value.status === 'pending'){
                    state.pending_counter++
                    state.completed_counter--
                }
                else{
                    state.pending_counter--
                    state.completed_counter++
                }
                return{
                    ...state,
                    tasks: [...state.tasks.slice(0, action.payload.task_idx),
                        action.payload.new_value,
                        ...state.tasks.slice(action.payload.task_idx + 1)]
                }
            }
        default:
            return state
    }
}

export default reducer