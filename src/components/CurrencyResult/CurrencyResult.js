import React, { Component } from 'react';

class CurrencyResult extends Component {

  conversionResult(currency){
    console.log(+this.props.activeChange[this.props.current]);
    console.log(this.props.rates[currency]);
    console.log(this.props.rates[this.props.current]);
    let current = this.props.activeChange[this.props.current] || 0;
    return +current * this.props.rates[currency] / this.props.rates[this.props.current];
  }

  render() {
    return (
      <div>
        <p>{this.conversionResult(this.props.currency)}</p>
        <p>1 {this.props.currency} = {this.props.rates[this.props.current] / this.props.rates[this.props.currency]} {this.props.current}</p>
      </div>
    );
  }
}

export default CurrencyResult;
