import React from 'react'
import PropTypes from 'prop-types'

function Price({ value, currency }) {
    const currencyString = currency || '$' 
    return (
        <span className="price">{ currencyString }{ value / 100 }</span>
    )
}

Price.propTypes = {
    value: PropTypes.number.isRequired,
    currency: PropTypes.string
}

export default Price