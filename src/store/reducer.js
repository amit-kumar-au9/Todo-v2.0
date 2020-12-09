const initialState = {
    tasks: []
}

const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case 'ADD_TASK':
            return{
                ...state, 
                tasks: [action.payload,...state.tasks]
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