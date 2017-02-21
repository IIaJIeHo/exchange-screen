import React, { Component } from 'react';
import Slider from 'react-slick';
import Currency from '../Currency/Currency';
import Header from '../Header/Header';
import Numbers from '../Numbers/Numbers';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      rates: {
          "EUR": 0.949485,
          "RUB": 57.767,
          "USD": 1,
        },
      current: "EUR",
      next: "RUB",
      pocket: {
        "USD": "30",
        "RUB": "10",
        "EUR": "15"
      },
      activeChange: 0

    }

    this.onExchange = this.onExchange.bind(this);
  }

  onExchange(e){
    let val = e.target.value;
    console.log(val);
    this.setState({activeChange: +val});
  }


  render() {

    var settings = {
      dots: true
    };

    return (
      <div className="App">
        <Header />
        <Currency {...this.state} type="start" onExchange={this.onExchange} />
        <Currency {...this.state} type="end" />
        <Numbers />
      </div>
    );
  }
}

export default App;
