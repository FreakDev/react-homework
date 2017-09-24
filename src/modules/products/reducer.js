import { combineReducers } from 'redux'

import * as actions from './actions'

function list(state = [], act) {
    switch (act.type) {
        case actions.PRODUCTS_DATA_LOADED:
            return act.data
        case actions.PRODUCTS_ADD_DATA:
            return [...state, ...act.data]
        case actions.PRODUCTS_CACHE_POP:
            return [...state,...act.data]
        default:
            return state
    }
}

function cache(state = [], act) {
    switch (act.type) {
        case actions.PRODUCTS_CACHE_LOADED:
            return [...state,...act.data]
        case actions.PRODUCTS_CACHE_POP:
            return state.slice(act.data.length)
        default:
            return state
    }
}

function loading(state = false, act) {
    switch (act.type) {
        case actions.PRODUCTS_LOADING:
            return act.loading
        default:
            return state
    }
}

function hasAll(state = false, act) {
    return act.type === actions.PRODUCTS_NO_MORE || state
}

function hasDisplayedAll(state = false, act) {
    return act.type === actions.PRODUCTS_CACHE_EMPTY || state
}

export default combineReducers({
    list,    
    cache,
    loading,
    hasAll,
    hasDisplayedAll
})
 