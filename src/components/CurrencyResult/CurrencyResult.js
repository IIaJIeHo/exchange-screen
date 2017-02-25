import React, { Component, PropTypes } from 'react';
import * as helpers from '../../helpers';

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

  componentWillReceiveProps(props){ /* maybe just to provide additinal state variable instead of checking*/
    let current = props.activeChange[props.current] || 0,
        newActive = Math.floor(+current * props.rates[props.currency] / props.rates[props.current] * 100)/100,
        range = Math.ceil(props.rates[props.currency] / props.rates[props.current]) / 100;

    if ((Math.round(Math.abs(newActive - this.state.active)*100)/100 > range)||(newActive <= range)){
      this.setState({active: newActive});
    }
  }

  onChange(e){
    let val = helpers.validateInput(e.target.value);

    this.setState({active: val},function () {
      this.props.onInputChangeResult(val);
    });
    
  }

  render() {
    return (
      <div>
        <input className="currency-input" type="text" value={this.state.active} onChange={this.onChange}/>
        <p className="currency-info">
        1 {this.props.currency} = {(this.props.rates[this.props.current] / this.props.rates[this.props.currency]).toFixed(2)} {this.props.current}
        </p>
      </div>
    );
  }
}

CurrencyResult.propTypes = {
  active: PropTypes.string,
  currency: PropTypes.string.isRequired,
  rates: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  onInputChangeResult: PropTypes.func.isRequired
};

export default CurrencyResult;
