import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid } from '../../../modules/layout'
import ProductGridElmt from './ProductGridElmt'

import { onLoad } from '../actions'

import './css/ProductGrid.css'

class ProductGrid extends Component {

    componentDidMount() {
        this.props.dispatch(onLoad())
    }

    render() {
        return (
            <section className="products">
                <Grid data={ this.props.data } Elmt={ ProductGridElmt } cols="3" />
            </section>        
        )    
    }
}

const mapStateToProps = state => {
    return {
        data: state.products.list
    }
}

export default connect(mapStateToProps)(ProductGrid)