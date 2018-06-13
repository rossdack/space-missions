import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import 'bootstrap-css-only/css/bootstrap.css';
import 'typeface-lato';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Body/>
        <Footer/>
      </div>
    );
  }
}

export default Home;
