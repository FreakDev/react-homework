import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid } from '../../../modules/layout'
import ProductGridElmt from './ProductGridElmt'

import { onLoad } from '../actions'

class ProductGrid extends Component {

    componentDidMount() {
        this.props.dispatch(onLoad())
    }

    render() {
        console.log(this.props.data)
        return (
            <section className="products">
                <Grid data={ this.props.data } Elmt={ ProductGridElmt } />
                {/* { this.props.data.map((product) => {
                    return (
                        <div className="grid-element">
                            
                        </div>
                    )
                }) } */}
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