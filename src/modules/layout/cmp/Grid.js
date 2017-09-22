import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './css/Grid.css'

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
        const { data, cols, Elmt, elmtClassName, rowClassName, className } = this.props
        const nbCols = parseInt(cols, 10) || 5
        const gridElmtCls = ['grid-element']
        gridElmtCls.push('grid-' + nbCols)
        elmtClassName && gridElmtCls.push(elmtClassName)

        let griddedData = []
        for (let r = 0; r < Math.ceil(data.length / nbCols); r++) {
            griddedData[r] = []
            for (let c = 0; c < nbCols; c++) {
                griddedData[r].push(data[r * nbCols + c])
            }
        }

        return (
            <div className={ 'grid' + (className ? ' ' + className : '') }>
                { griddedData.map((rowData, r) => (
                    <div key={ this.state.id + '-' + r } className={ 'grid-row' + (rowClassName ? ' ' + rowClassName : '') }>
                        { rowData.map( (gridElmtProps, c) => gridElmtProps && (
                        <div className={ gridElmtCls.join(' ') }>
                            { React.createElement(Elmt, Object.assign(gridElmtProps, { key: this.state.id + '-' + r + '-' + c })) }
                        </div>
                        )) }
                    </div>
                )) }
                <div className="clear">&nbsp;</div>
            </div>
        )
    }
}

Grid.propTypes = {
    data: PropTypes.array.isRequired,
    cols: PropTypes.number,
    Elmt: PropTypes.func.isRequired,
    elmtClassName: PropTypes.string,
    rowClassName: PropTypes.string,
    className: PropTypes.string
}

export default Grid