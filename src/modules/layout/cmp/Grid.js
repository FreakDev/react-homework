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
        let data = this.props.data.slice().sort((el1, el2) => el1[order] > el2[order] ? 1 : -1)

        this.setState({
            order,
            griddedData: this.makeGriddedData(data)
        })
        this.props.onChangeGridOrder && this.props.onChangeGridOrder(order)
    }

    makeGriddedData(data = []) {

        let griddedData = []
        let globalCount = 0,
            lastCount = 0,
            productCount = 0,
            realProductCount = 0

        while (realProductCount < data.length) {
            let r = Math.floor(globalCount / this.props.cols),
                c = globalCount % this.props.cols
            griddedData[r] || (griddedData[r] = [])
            if (!this.props.disableAds && productCount - lastCount === (this.props.adsFrequency || DEFAULT_ADS_FREQ)) {
                griddedData[r][c] = { ads: true }
                lastCount = productCount
            } else {
                if (!data[realProductCount].ads) {
                    griddedData[r][c] = data[realProductCount]
                    productCount++    
                } else {
                    globalCount--
                }
                realProductCount++                
            }

            globalCount++
        }    

        return griddedData

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {

            function flatten(arr) {
                return arr.reduce(function (flat, toFlatten) {
                    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
                }, []);
            }

            let data = [...flatten(this.state.griddedData), ...nextProps.data.slice(this.props.data.length - nextProps.data.length)]

            this.setState({
                griddedData: this.makeGriddedData(data, this.state.order)
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
            <div>
            <GridHeader gridId={ this.state.id } orderOptions={ orderOptions } onChangeOrder={ this.onChangeGridOrder }>
                <h3>{ title }</h3>
            </GridHeader>            
            <div className={ 'grid' + (className ? ' ' + className : '') }>
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