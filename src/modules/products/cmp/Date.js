import React from 'react'
import PropTypes from 'prop-types'

function DateCmp({ date }) {
    const d = new Date(date)
    const nbDays = Math.ceil(((new Date()) - d) / (1000 * 3600 * 24))
    const dateString = nbDays < 7 
        ? nbDays + ' day' + (nbDays > 1 ? 's' : '') + ' ago' 
        : date
    return (
        <span className="date">
            { dateString }
        </span>
    )
}


DateCmp.propTypes = {
    date: PropTypes.string.isRequired
}

export default DateCmp