import api from '../../api'

export const PRODUCTS_DATA_LOADED = 'PRODUCTS_DATA_LOADED'
export const PRODUCTS_LOADING = 'PRODUCTS_LOADING'
export const PRODUCTS_CACHE_POP = 'PRODUCTS_CACHE_POP'
export const PRODUCTS_CACHE_LOADED = 'PRODUCTS_CACHE_LOADED'
export const PRODUCTS_CACHE_EMPTY = 'PRODUCTS_CACHE_EMPTY'
export const PRODUCTS_NO_MORE = 'PRODUCTS_NO_MORE'


export function loadMore () {
    return (dispath, getState) => {
        if (!getState().products.loading) {
            const display = !getState().products.list.length
            dispath(loading())
            api.get()
            .then(dataJson => {
                 dispath(loading(false))        
                 if (display) {
                     dispath({
                         type: PRODUCTS_DATA_LOADED,
                         data: dataJson
                     })
                 } else {
                     if (dataJson.length) {
                         dispath({
                             type: PRODUCTS_CACHE_LOADED,
                             data: dataJson
                         })
                     } else {
                         dispath({
                             type: PRODUCTS_NO_MORE
                         })
                     }
                 }
            })
            .then(() => {
                 if (!getState().products.cache.length)
                     loadMore()
            })
 
        }
    }
}

export function cachePop(howMany) {
    return (dispatch, getState) => {
        const cache = getState().products.cache
        if (!getState().products.hasDisplayedAll) {
            if (cache.length && cache.length < howMany) {
                dispatch({
                    type: PRODUCTS_CACHE_EMPTY
                })
            }
            dispatch({
                type: PRODUCTS_CACHE_POP,
                data: (cache.slice(0, howMany))
            });
            if (cache.length < (howMany * 2)) {
                dispatch(loadMore())
            }    
        }
    }
}

export function loading(loading = true) {
    return {
        type: PRODUCTS_LOADING,
        loading
    }
}