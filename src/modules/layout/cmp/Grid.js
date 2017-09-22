import React, { Component } from 'react'
import PropTypes from 'prop-types'

var gridInc = 0
function getGridId() {
    return 'grid-' + ++gridInc
}

class Grid extends Component {

    state = {
        id: -1
    }

    componentWillMount() {
        this.setState({
            id: getGridId()
        })
    }

    render() {
        const { data, cols, Elmt, elmtClassName, className } = this.props
        const nbCols = cols || 5
        const gridElmtCls = ['grid-element']
        gridElmtCls.push('grid-' + nbCols)
        elmtClassName && gridElmtCls.push(elmtClassName)

        return (
            <div className={ 'grid-row' + className ? className : '' }>
                <div className={ gridElmtCls.join(' ') }>
                    { data.map((gridElmtProps, k) => React.createElement(Elmt, Object.assign(gridElmtProps, { key: this.state.id + k})) ) }
                </div>
            </div>
        )
    }
}

Grid.propTypes = {
    data: PropTypes.array.isRequired,
    cols: PropTypes.number,
    Elmt: PropTypes.func.isRequired,
    elmtClassName: PropTypes.string,
    className: PropTypes.string
}

export default Grid