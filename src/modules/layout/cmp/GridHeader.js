import React from 'react'
import PropTypes from  'prop-types'

import './css/GridHeader.css'

function GridHeader({ orderOptions, onChangeOrder, gridId, children }) {
    return (
        <div className="grid-header">
            { orderOptions 
                ? (
                <select className="order-list" onChange={ (e) => { onChangeOrder(e.target.value) } }>
                    { orderOptions.map((opt, k) => {
                        if (typeof opt === 'string') {
                            return (<option key={ gridId + 'order-opt-' + k } value={ opt }>{ opt }</option> )
                        } else {
                            return  (<option key={ gridId + 'order-opt-' + k } value={ opt.value }>{ opt.label }</option> )
                        }
                    } ) }
                </select>
                )
                : ''
            }
            { children }
        </div>
    )
}

GridHeader.propTypes = {
    orderOptions: PropTypes.array,
    onChangeOrder:PropTypes.func,
    gridId: PropTypes.string.isRequired
}

export default GridHeader