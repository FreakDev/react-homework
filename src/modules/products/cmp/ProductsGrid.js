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

        this.handleScroll = this.handleScroll.bind(this);
    }

    state = {
        gridOrder: 'id'
    }

    handleScroll() {
        if ((new Date()).getTime() - lastHandleScroll > 300) {
            if (window.innerHeight + window.scrollY > document.body.offsetHeight * 0.90) {
                if (!this.props.loading) {
                    this.props.dispatch(cachePop(5))
                }
            }
            lastHandleScroll = (new Date()).getTime()
        }
    }

    componentDidMount() {
        this.props.dispatch(loadMore())

        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
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