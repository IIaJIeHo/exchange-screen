import React, { Component } from 'react';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import CurrencyResult from '../CurrencyResult/CurrencyResult';
import './Slide.css';

class Slide extends Component {

  constructor(props) {
    super(props);
  } 

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate inside Slide'+this.props.type);
    console.log(nextProps);
    console.log(nextProps.currency);
    console.log(nextProps.next);
    console.log(nextProps.current);
    let currentCurrency = this.props.type == "start" ? nextProps.current : nextProps.next;

    if (nextProps.currency === currentCurrency) {
      console.log(this.props === nextProps);
      console.log(nextState);
      console.log('shouldComponentUpdate for '+this.props.type);
      return true;
    }


    return false;
  }


  render() {
    let currentCurrency = this.props.type == "start" ? this.props.current : this.props.next;
    return (
      <div className="slide">
        <div className="slide-column">
          <h3 className="currency-header">{this.props.currency}</h3>
          <p className="currency-info">You have: {this.props.pocket[this.props.currency].toFixed(2)}{currentCurrency}</p>
        </div>
        <div className="slide-column">
          {this.props.type == "start" ? <CurrencyInput active={this.props.active} notEnough={this.props.notEnough} onInputChange={this.props.onInputChange} /> :
          <CurrencyResult 
            activeChange={this.props.activeChange} 
            currency={this.props.currency} 
            onInputChangeResult={this.props.onInputChangeResult} 
            current={this.props.current} 
            next={this.props.next}
            rates={this.props.rates} />}
        </div>
      </div>
    );
  }
}

export default Slide;