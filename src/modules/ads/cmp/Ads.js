import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../../api'

class Ads extends Component {

    state = {
        url: ''
    }

    static prevAdsCode = 0

    componentDidMount() {
        let adsCode
        do {
            adsCode = Math.floor(Math.random()*1000)
        } while (adsCode === Ads.prevAdsCode)
        Ads.prevAdsCode = adsCode
        api.getAds(adsCode).then((url) => {
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