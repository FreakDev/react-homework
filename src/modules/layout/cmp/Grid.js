import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Ads } from '../../../modules/ads'
import GridHeader from './GridHeader'

import './css/Grid.css'

var gridInc = 0
function getGridId() {
    return 'grid-' + ++gridInc
}

const DEFAULT_ADS_FREQ = 12

class Grid extends Component {

    constructor(props) {
        super(props)

        this.onChangeGridOrder = this.onChangeGridOrder.bind(this)
    } 

    state = {
        id: -1,
        order: '',
        griddedData: []
    }

    onChangeGridOrder(order) {
        this.setState({
            order,
            griddedData: this.makeGriddedData(this.props.data, order)
        })
        this.props.onChangeGridOrder && this.props.onChangeGridOrder(order)
    }

    makeGriddedData(data = [], sortOrder = null) {
        if (sortOrder) {
            data.sort((el1, el2) => el1[this.state.order] > el2[this.state.order] ? 1 : -1)
        }

        let griddedData = []
        let globalCount = 0,
            lastCount = 0,
            productCount = 0
        while (productCount < data.length) {
            let r = Math.floor(globalCount / this.props.cols),
                c = globalCount % this.props.cols
            griddedData[r] || (griddedData[r] = [])
            if (!this.props.disableAds && productCount - lastCount === (this.props.adsFrequency || DEFAULT_ADS_FREQ)) {
                griddedData[r][c] = { ads: true }
                lastCount = productCount
            } else {
                griddedData[r][c] = data[productCount]
                productCount++
            }

            globalCount++
        }    

        return griddedData

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                griddedData: this.makeGriddedData(nextProps.data, this.state.order)
            })
        }
    }

    componentWillMount() {
        this.setState({
            id: getGridId()
        })
    }

    render() {
        const { data, cols, Elmt, title, elmtClassName, rowClassName, className, disableAds } = this.props
        const nbCols = parseInt(cols, 10) || 5
        const gridElmtCls = ['grid-element']

        gridElmtCls.push('grid-' + nbCols)
        elmtClassName && gridElmtCls.push(elmtClassName)
        
        const orderOptions = data.length ? Object.keys(data[0]) : []

        return (
            <div className={ 'grid' + (className ? ' ' + className : '') }>
                <GridHeader gridId={ this.state.id } orderOptions={ orderOptions } onChangeOrder={ this.onChangeGridOrder }>
                    <h3>{ title }</h3>
                </GridHeader>
                { this.state.griddedData.map((rowData, r) => (
                    <div key={ this.state.id + '-' + r } className={ 'grid-row' + (rowClassName ? ' ' + rowClassName : '') }>
                        { rowData.map( (gridElmtProps, c) => 
                            gridElmtProps 
                                ? (
                                    <div className={ gridElmtCls.join(' ') } key={ this.state.id + '-' + r + '-' + c } >
                                        { !gridElmtProps.ads
                                            ? React.createElement(Elmt, Object.assign(gridElmtProps)) 
                                            : ( <Ads /> )
                                        }
                                    </div> 
                                ) 
                                : '' )
                        }

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
    onChangeGridOrder: PropTypes.func,
    disableAds: PropTypes.bool,
    adsFrequency:PropTypes.number
}

export default Grid