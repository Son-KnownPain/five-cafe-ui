import { createSelector } from '@reduxjs/toolkit'

export const nameFilterSelector = state => state.filter.name
export const statusSelector = state => state.filter.status
export const todosSelector = state => state.todos

export const todosRemaining = createSelector(nameFilterSelector, statusSelector, todosSelector, (nameFilter, status, todos) => {
    let result = todos.filter(todo => todo.name.toUpperCase().includes(nameFilter.toUpperCase()))

    switch (status) {
        case 'completed':
            result = result.filter(todo => todo.completed)
            break
        case 'not_completed':
            result = result.filter(todo => !todo.completed)
            break
        default:
        // DO NOTHING
    }

    return result
})