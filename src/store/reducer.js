const initialState = {
    tasks: [],
    counter: 0
}

const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case 'ADD_TASK':
            const new_task = {
                task_title: action.payload[0], 
                task_completion_date: action.payload[1], 
                task_details: action.payload[2],
                id: state.counter++
            }
            return{
                ...state, 
                tasks: [new_task,...state.tasks]
            }
        case 'REMOVE_TASK':
            {
                const index = action.payload
                return{
                    ...state,
                    tasks: [...state.tasks.slice(0, index),
                        ...state.tasks.slice(index + 1)]
                }
            }
        case 'EDIT_TASK':
            {   
                const new_value = action.payload.new_value
                const index = action.payload.task_idx
                return{
                    ...state,
                    tasks: [...state.tasks.slice(0, index),
                        new_value,
                        ...state.tasks.slice(index + 1)]
                }
            }
        default:
            return state
    }
}

export default reducer