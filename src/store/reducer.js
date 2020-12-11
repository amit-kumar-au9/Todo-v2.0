const initialState = {
    tasks: [],
    counter: 0
}

const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case 'ADD_TASK':
            const new_task = {
                title: action.payload[0], 
                end_date: action.payload[1], 
                detail: action.payload[2],
                id: state.counter++
            }
            return{
                ...state, 
                tasks: [...state.tasks,new_task]
            }
        case 'REMOVE_TASK':
            {
                const index = state.tasks.indexOf(action.payload)
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