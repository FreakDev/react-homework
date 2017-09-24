import React from 'react'

import Price from './Price'
import Date from './Date'
import { Button } from '../../../modules/layout'

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
                    <Button name="add-to-cart" icon="add_shopping_cart">add to cart</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductGridElmt

