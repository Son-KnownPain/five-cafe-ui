import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'filter',
    initialState: {
        name: '',
        status: 'all'
    },
    reducers: {
        setNameFilter: (state, action) => {
            state.name = action.payload
        },
        changeTodoStatus: (state, action) => {
            state.status = action.payload
        }
    }
})