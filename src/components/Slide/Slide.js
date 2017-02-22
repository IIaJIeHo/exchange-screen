import React, { Component } from 'react';

class Slide extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      active: this.props.active || '0'
    }

    this.onChange = this.onChange.bind(this);
  } 

  onChange(e){
    let val = +e.target.value;
    this.setState({active: val});
    //this.props.onInputChange(val);
  }

  conversionResult(currency){
    return +this.props.activeChange[this.props.current] * this.props.rates[currency] / this.props.rates[this.props.current];
  }

  render() {
    let currentCurrency = this.props.type == "start" ? this.props.current : this.props.next;
    return (
      <div>
        {this.props.type == "start" ? <input type="text" value={this.state.active} onChange={this.onChange}/> : 
         this.props.type == "end" ? <p>Result: {this.conversionResult(this.props.currency)}</p> : ''}
        <h5>{this.props.currency}</h5>
        <p>{this.props.rates[this.props.currency]}</p>
        {this.props.type == "end" ? <p>1 {this.props.currency} = {this.props.rates[this.props.current] / this.props.rates[this.props.currency]} {this.props.current}</p> : ''}
        <p>amount:{this.props.pocket[this.props.currency]}</p>
      </div>
    );
  }
}

export default Slide;