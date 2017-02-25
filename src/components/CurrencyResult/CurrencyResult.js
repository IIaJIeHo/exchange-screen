import React, { Component } from 'react';

class CurrencyResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: this.props.active || ''
    }

    this.onChange = this.onChange.bind(this);
  }

  conversionResult(currency){
    let current = this.props.activeChange[this.props.current] || 0;
    return +current * this.props.rates[currency] / this.props.rates[this.props.current];
  }

  componentWillReceiveProps(props){
    let current = props.activeChange[props.current] || 0;
    let newActive = Math.floor(+current * props.rates[props.currency] / props.rates[props.current] * 100)/100;
    console.log('CHANGE MOTHER');
    console.log(props.activeChange);
    console.log(newActive);
    console.log(this.state.active);
    let range = Math.ceil(props.rates[props.currency] / props.rates[props.current]) / 100;
    console.log(range);
    console.log(Math.round(Math.abs(newActive - this.state.active)*100)/100);
    if (Math.round(Math.abs(newActive - this.state.active)*100)/100 > range){
      console.log('CHANGE componentWillReceiveProps');
      this.setState({active: newActive});
    }
    
  }

  onChange(e){
    console.log('onChange ----------');
    console.log(e.target.value);
    let nonNumericRegex = /[^0-9.]+/g;
    let val = e.target.value.replace(nonNumericRegex, "");
    if (val === '.'){
      val = '0.';
    } else {
      let arr_val = val.split('.');
      if (arr_val.length > 1){
        val = arr_val[0]+'.'+arr_val[1].slice(0,2);
      }
    }

    console.log(val);
    this.setState({active: val},function () {
      this.props.onInputChangeResult(val);
    });
    
  }

  render() {
    return (
      <div>
        <p className="currency-info">{this.conversionResult(this.props.currency)}</p>
        <input className="currency-input" type="text" value={this.state.active} onChange={this.onChange}/>
        <p className="currency-info">1 {this.props.currency} = {(this.props.rates[this.props.current] / this.props.rates[this.props.currency]).toFixed(2)} {this.props.current}</p>
      </div>
    );
  }
}

export default CurrencyResult;
