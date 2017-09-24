import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid } from '../../../modules/layout'
import ProductGridElmt from './ProductGridElmt'

import { loadMore, cachePop } from '../actions'

import './css/ProductGrid.css'

let lastHandleScroll = 0

class ProductGrid extends Component {

    constructor(props) {
        super(props)

        this._scrollPos = {}
        this._scrollDiff = {}

        this.handleScroll = this.handleScroll.bind(this);
    }

    state = {
        gridOrder: 'id'
    }

    handleScroll() {
        if ((new Date()).getTime() - lastHandleScroll > 300) {
            this._scrollDiff = { x: window.scrollX - this._scrollPos.x, y: window.scrollY - this._scrollPos.y }
            this._scrollPos = { x: window.scrollX, y: window.scrollY}
    
            if (Math.abs(this._scrollDiff.y) > 0 && window.innerHeight + window.scrollY > document.body.offsetHeight * 0.80) {
                if (!this.props.loading) {
                    this.props.dispatch(cachePop(3))
                }
            }
            lastHandleScroll = (new Date()).getTime()
        }
    }

    componentDidMount() {
        this.props.dispatch(loadMore(9))

        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        const { data, loading, hasDisplayedAll } = this.props
        return (
            <section className="products">
                <Grid title="Products" data={ data } Elmt={ ProductGridElmt } cols={3} />
                { loading 
                    ? (<div className="loading">Loading...</div>)
                    : '' 
                }
                { hasDisplayedAll 
                    ? (<div className="end">~ end of catalogue ~</div>)
                    : '' 
                }                
            </section>        
        )    
    }
}

const mapStateToProps = state => {
    return {
        data: state.products.list,
        loading: state.products.loading,
        hasDisplayedAll: state.products.hasDisplayedAll
    }
}

export default connect(mapStateToProps)(ProductGrid)