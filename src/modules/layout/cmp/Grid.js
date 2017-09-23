import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Ads } from '../../../modules/ads'
import GridHeader from './GridHeader'

import './css/Grid.css'

var gridInc = 0
function getGridId() {
    return 'grid-' + ++gridInc
}

class Grid extends Component {

    constructor(props) {
        super(props)

        this.onChangeGridOrder = this.onChangeGridOrder.bind(this)
    } 

    state = {
        id: -1,
        order: ''
    }

    onChangeGridOrder(order) {
        this.setState({
            order
        })
        this.props.onChangeGridOrder && this.props.onChangeGridOrder(order)
    }

    componentWillMount() {
        this.setState({
            id: getGridId()
        })
    }

    render() {
        const { data, cols, Elmt, title, elmtClassName, rowClassName, className, adsFrequency } = this.props
        const adsFreq = adsFrequency || 20
        const nbCols = parseInt(cols, 10) || 5
        const gridElmtCls = ['grid-element']
        gridElmtCls.push('grid-' + nbCols)
        elmtClassName && gridElmtCls.push(elmtClassName)

        if (this.state.order) {
            data.sort((el1, el2) => el1[this.state.order] > el2[this.state.order] ? 1 : -1)
        }

        const orderOptions = data.length ? Object.keys(data[0]) : []

        let griddedData = []
        for (let r = 0; r < Math.ceil(data.length / nbCols); r++) {
            griddedData[r] = []
            for (let c = 0; c < nbCols; c++) {
                griddedData[r].push(data[r * nbCols + c])
            }
        }

        return (
            <div className={ 'grid' + (className ? ' ' + className : '') }>
                <GridHeader gridId={ this.state.id } orderOptions={ orderOptions } onChangeOrder={ this.onChangeGridOrder }>
                    <h3>{ title }</h3>
                </GridHeader>
                { griddedData.map((rowData, r) => (
                    <div key={ this.state.id + '-' + r } className={ 'grid-row' + (rowClassName ? ' ' + rowClassName : '') }>
                        { rowData.map( (gridElmtProps, c) => gridElmtProps && (
                        <div className={ gridElmtCls.join(' ') } key={ this.state.id + '-' + r + '-' + c } >
                            { ((r + c) && (r * cols + c) % adsFreq === 0) 
                                && ( <Ads  /> ) }
                            { React.createElement(Elmt, Object.assign(gridElmtProps)) }
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
    className: PropTypes.string,
    title: PropTypes.string,
    onChangeGridOrder: PropTypes.func

}

export default Grid