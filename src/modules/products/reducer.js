import { combineReducers } from 'redux'

import * as actions from './actions'

function list(state = [], act) {
    switch (act.type) {
        case actions.PRODUCTS_DATA_LOADED:
            return [...state,...act.data]
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

export default combineReducers({
    list,
    loading
})
 