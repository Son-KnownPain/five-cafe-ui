import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './reducers/filterSlice'
import todosSlice from './reducers/todosSlice'

const store = configureStore({
    reducer: {
        filter: filterSlice.reducer,
        todos: todosSlice.reducer
    }
})

export default store