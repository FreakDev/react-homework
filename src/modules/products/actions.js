import api from '../../api'

export const PRODUCTS_DATA_LOADED = 'PRODUCTS_DATA_LOADED'
export const PRODUCTS_LOADING = 'PRODUCTS_LOADING'

export function onLoad () {
    return (dispath, getState) => {
        dispath(loading())
        api.get()
           .then(dataJson => {
                dispath(dataLoaded(dataJson))
                dispath(loading(false))
           })
    }
}

export function dataLoaded(data) {
    return {
        type: PRODUCTS_DATA_LOADED,
        data
    }
}

export function loading(state = true) {
    return {
        type: PRODUCTS_LOADING,
        state
    }
}