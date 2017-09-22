import React from 'react'

function ProductGridElmt({ face, price }) {
    return (
        <div>
            <div className="face">{ face }</div>
            <div>
                <div className="info">
                    <span className="price">{ price }</span>
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

