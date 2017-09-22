import React from 'react'

import Price from './Price'
import Date from './Date'

import './css/ProductGridElmt.css'

function ProductGridElmt({ id, face, price, size, date }) {
    return (
        <div className="product">
            <div className="face" style={{ fontSize: size }}>{ face }</div>
            <div>
                <div className="info">
                    <Price value={ price } />
                    <p>{ id }</p>
                    <p><Date date={ date} /></p>
                </div>
                <div className="buttons">
                    <div className="button add-to-cart">add to cart</div>
                    <div className="button small transparent like" />
                    <div className="button small transparent share" />
                </div>
            </div>
        </div>
    )
}

export default ProductGridElmt

