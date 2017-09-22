import { combineReducers } from 'redux'

import * as actions from './actions'

function list(state = [], act) {
    switch (act.type) {
        case actions.PRODUCTS_DATA_LOADED:
            return act.data
        default:
            return state
    }
}

export default combineReducers({
    list
})
 