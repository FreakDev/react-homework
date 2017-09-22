import React, { Component } from 'react';

import { ProductsGrid } from './modules/products'
import { Ads } from './modules/ads'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
            <h1>Discount Ascii Warehouse</h1>

            <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

            <p>But first, a word from our sponsors:</p> <Ads />
        </header>

        <ProductsGrid />
      </div>
    );
  }
}

export default App;
