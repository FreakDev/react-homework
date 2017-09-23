import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid } from '../../../modules/layout'
import ProductGridElmt from './ProductGridElmt'

import { loadMore } from '../actions'

import './css/ProductGrid.css'

class ProductGrid extends Component {

    state = {
        gridOrder: 'id'
    }

    componentDidMount() {
        this.props.dispatch(loadMore())
    }

    render() {
        const { data, loading } = this.props
        return (
            <section className="products">
                <Grid title="Products" data={ data } Elmt={ ProductGridElmt } cols={3} />
                { loading 
                    ? (<div className="loading">Loading...</div>)
                    : '' 
                }
            </section>        
        )    
    }
}

const mapStateToProps = state => {
    return {
        data: state.products.list,
        loading: state.products.loading
    }
}

export default connect(mapStateToProps)(ProductGrid)