import React, { Component } from 'react'
import { connect } from 'react-redux'

import { onLoad } from '../actions'

class ProductGridCmp extends Component {

    componentDidMount() {
        this.props.dispatch(onLoad())
    }

    render() {
        return (
            <section className="products">
                ... products go here ...
            </section>        
        )    
    }
}

export default connect()(ProductGridCmp)