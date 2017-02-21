import React, { Component } from 'react';
import Slider from 'react-slick';
import Currency from '../Currency/Currency';
import Header from '../Header/Header';
import Numbers from '../Numbers/Numbers';
import './App.css';



class App extends Component {
  render() {

    var settings = {
      dots: true
    };

    return (
      <div className="App">
        <Header />
        <Currency />
        <Currency />
        <Numbers />
      </div>
    );
  }
}

export default App;
