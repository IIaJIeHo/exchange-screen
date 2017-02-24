import React, { Component } from 'react';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import CurrencyResult from '../CurrencyResult/CurrencyResult';
import './Slide.css';

class Slide extends Component {

  constructor(props) {
    super(props);
  } 

  render() {
    let currentCurrency = this.props.type == "start" ? this.props.current : this.props.next;
    return (
      <div className="slide">
        <div className="slide-column">
          <h3>{this.props.currency}</h3>
          <p>You have: {this.props.pocket[this.props.currency]}{currentCurrency}</p>
        </div>
        <div className="slide-column">
          {this.props.type == "start" ? <CurrencyInput active={this.props.active} notEnough={this.props.notEnough} onInputChange={this.props.onInputChange} /> :
          <CurrencyResult activeChange={this.props.activeChange} currency={this.props.currency} current={this.props.current} rates={this.props.rates} />}
        </div>
      </div>
    );
  }
}

export default Slide;