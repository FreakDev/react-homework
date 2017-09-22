import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../../api'

class Ads extends Component {

    state = {
        url: ''
    }

    componentDidMount() {
        api.getAds(Math.floor(Math.random()*1000)).then((url) => {
            this.setState({
                url
            })
        })
    }

    render() {
        return (
            <img alt="sponsor" className="ad" src={ this.state.url } />
        )    
    }
}

export default Ads