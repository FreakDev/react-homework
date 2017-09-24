import api from '../../api'

export const PRODUCTS_ADD_DATA = 'PRODUCTS_ADD_DATA'
export const PRODUCTS_DATA_LOADED = 'PRODUCTS_DATA_LOADED'
export const PRODUCTS_LOADING = 'PRODUCTS_LOADING'
export const PRODUCTS_CACHE_POP = 'PRODUCTS_CACHE_POP'
export const PRODUCTS_CACHE_LOADED = 'PRODUCTS_CACHE_LOADED'
export const PRODUCTS_CACHE_EMPTY = 'PRODUCTS_CACHE_EMPTY'
export const PRODUCTS_NO_MORE = 'PRODUCTS_NO_MORE'


export function loadMore (howMany, immediateDisplay = -1) {
    return (dispath, getState) => {
        if (!getState().products.loading) {
            const display = !getState().products.list.length
            dispath(loading())
            api.get(howMany)
            .then(dataJson => {
                 dispath(loading(false))        
                 if (display) {
                     dispath({
                         type: PRODUCTS_DATA_LOADED,
                         data: dataJson
                     })
                 } else {
                     if (dataJson.length) {
                         let data
                         if (immediateDisplay !== -1) {
                             data = dataJson.slice(immediateDisplay)
                             dispath({
                                type: PRODUCTS_ADD_DATA,
                                data: dataJson.slice(0, immediateDisplay)
                            })
                        } else {
                             data = dataJson
                         }
                         dispath({
                             type: PRODUCTS_CACHE_LOADED,
                             data
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
                dispatch(loadMore(howMany * 4, !cache.length ? howMany : -1))
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