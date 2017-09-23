import api from '../../api'

export const PRODUCTS_DATA_LOADED = 'PRODUCTS_DATA_LOADED'
export const PRODUCTS_LOADING = 'PRODUCTS_LOADING'
export const PRODUCTS_CACHE_POP = 'PRODUCTS_CACHE_POP'
export const PRODUCTS_CACHE_LOADED = 'PRODUCTS_CACHE_LOADED'

export function loadMore () {
    return (dispath, getState) => {
        const display = !getState().products.list.length
        if (display)
            dispath(loading())
        api.get()
           .then(dataJson => {
                if (display) {
                    dispath(dataLoaded(dataJson))
                    dispath(loading(false))
                } else {
                    dispath(cacheLoaded(dataJson))
                }
           })
           .then(() => {
                if (!getState().products.cache.length)
                    loadMore()
           })
    }
}

export function cachePop(howMany) {
    return (dispatch, getState) => {
        const cache = getState().products.cache
        dispatch({
            type: PRODUCTS_CACHE_POP,
            data: (cache.slice(0, howMany))
        });
        if (cache.length < (howMany * 2)) {
            dispatch(loadMore())
        }        
    }
}

export function cacheLoaded(data) {
    return {
        type: PRODUCTS_CACHE_LOADED,
        data
    }
}

export function dataLoaded(data) {
    return {
        type: PRODUCTS_DATA_LOADED,
        data
    }
}

export function loading(loading = true) {
    return {
        type: PRODUCTS_LOADING,
        loading
    }
}