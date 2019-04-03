import { TasksState } from '../app.state';
import { TasksActions, ADD_CATEGORY, UPDATE_CATEGORY } from '../actions/tasks.actions';

let initialState: TasksState = { 
    categories: [],
    tasks: []
};

export function reducer(state = initialState, action: TasksActions): TasksState {
    switch (action.type) {
        case ADD_CATEGORY: {
            return { 
                ...state, 
                categories: [
                    ...state.categories, 
                    action.payload
                ] 
            }
        }
        case UPDATE_CATEGORY: {
            return { 
                ...state, 
                categories: [
                    ...state.categories.map(c =>  {
                        return c.id === action.payload.id ? action.payload : c
                    })
                ]
            }
        }
        default: {
            return state;
        }
    }
} 