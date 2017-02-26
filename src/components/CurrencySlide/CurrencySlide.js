import React, { Component, PropTypes} from 'react';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import CurrencyResult from '../CurrencyResult/CurrencyResult';
import './CurrencySlide.css';

class CurrencySlide extends Component {

  constructor(props) {
    super(props);
  } 

  shouldComponentUpdate(nextProps, nextState) {
    let currentCurrency = this.props.type == "start" ? nextProps.current : nextProps.next;

    if (nextProps.currency === currentCurrency) {
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
          {this.props.type == "start" ? 
          <CurrencyInput 
            active={this.props.active} 
            notEnough={this.props.notEnough} 
            onInputChange={this.props.onInputChange}
            rates={this.props.rates} /> :
          <CurrencyResult 
            activeChange={this.props.activeChange} 
            currency={this.props.currency} 
            onInputChangeResult={this.props.onInputChangeResult} 
            current={this.props.current} 
            rates={this.props.rates} />}
        </div>
      </div>
    );
  }
}

CurrencySlide.propTypes = {
  active: PropTypes.string,
  notEnough: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onInputChangeResult: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
  rates: PropTypes.object.isRequired
};

export default CurrencySlide;