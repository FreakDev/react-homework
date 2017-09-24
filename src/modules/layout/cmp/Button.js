import React from 'react'

import './css/Button.css'

function Button({ onClick, icon, name, small, transparent, children }) {
    let cssClass = ["button", name]

    if (small)
        cssClass.push('small')

    if (transparent)
        cssClass.push('transparent')
    
    return (
        <div onClick={ onClick } className={ cssClass.join(' ') }>
            { icon 
                ? (<i className="material-icons">{ icon }</i>)
                : '' }
            <p>
            { children }
            </p>
        </div>
    )
}

export default Button