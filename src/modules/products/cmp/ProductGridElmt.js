import React from 'react'

import Price from './Price'

import './css/ProductGridElmt.css'

function ProductGridElmt({ face, price, size }) {
    return (
        <div className="product">
            <div className="face" style={{ fontSize: size }}>{ face }</div>
            <div>
                <div className="info">
                    <Price value={ price } />
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

