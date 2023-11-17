import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'todos',
    initialState: [
        {
            id: 1,
            name: 'Quet nha',
            priority: 'Medium',
            completed: false,
        },
        {
            id: 2,
            name: 'Rua chen',
            priority: 'Low',
            completed: false,
        },
    ],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        removeTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload)
        },
        toggleTodoStatus: (state, action) => {
            return state.map(todo => {
                if (todo.id === action.payload) 
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                else
                    return todo
            })
        }
    }
})