import React, { Component, PropTypes } from 'react';
import * as exchangeActions from '../../actions/exchangeActions';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Currency from '../Currency/Currency';
import Header from '../Header/Header';
import './App.css';

/* make style better of the code */
/* es-lint suggestion */

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      current: "EUR",
      next: "RUB",
      activeChange : {
        "USD": 15
      },
      notEnough: true
    }

    this.onExchange = this.onExchange.bind(this);
    this.setCurrentCurrency = this.setCurrentCurrency.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.notEnough = this.notEnough.bind(this);
    this.shiftRates = this.shiftRates.bind(this);
    this.props.actions.startRatesAsync();
  }

  notEnough(activeChange,pocket,currency){
    if ((!activeChange[currency])||(activeChange[currency] <= 0 )||(activeChange[currency] > pocket[currency])){
      this.setState({notEnough: true});
    } else {
      this.setState({notEnough: false});
    }
  }

  componentDidMount() {
    this.notEnough(this.state.activeChange,this.props.pocket,this.state.current);
  }

  onInputChange(newActiveChange){
    this.setState({activeChange: newActiveChange});
    this.notEnough(newActiveChange,this.props.pocket,this.state.current);
  }

  onCancel(e){
    let base = {};
    base[this.state.current] = '';
    this.setState({activeChange: Object.assign({},this.state.activeChange,base)});
  }

  onExchange(e){
    let pocket = this.props.pocket,
        active = this.state.activeChange,
        current = this.state.current,
        next = this.state.next,
        base = {};

    base[current] = Math.round((pocket[current] - active[current])*100)/100;
    base[next] = Math.round((pocket[next] + active[current]*this.props.rates[next]/this.props.rates[current])*100)/100;
    pocket = Object.assign({},pocket,base);

    this.notEnough(this.state.activeChange,pocket,this.state.current);
    this.props.actions.updatePocket(pocket);
  }

  shiftRates(currency){
    let ratesKeys = Object.keys(this.props.rates),
        nextIndex = ratesKeys.indexOf(currency) - 1;

    nextIndex = nextIndex === -1 ?  ratesKeys.length - 1 : nextIndex;
    return ratesKeys[nextIndex];
  }

  setCurrentCurrency(currency,type) {
    let newValue;
    type == "start" ? this.setState({current: currency}) : this.setState({next: currency});
    if (type == "start") {
      this.notEnough(this.state.activeChange,this.props.pocket,currency);
      if (currency ==  this.state.next) {
        newValue = this.shiftRates(this.state.next);
        this.setState({next: newValue});
      }
    } else {
      if (currency ==  this.state.current) {
        newValue = this.shiftRates(this.state.current);
        this.setState({current: newValue});
      }
    }

  }


  render() {

    return (
      <div className="App">
        <Header onCancel={this.onCancel} 
                notEnough={this.state.notEnough} 
                onExchange={this.onExchange} 
                rates={this.props.rates} 
                current={this.state.current} 
                next={this.state.next}/>
        <Currency {...this.state} 
                  notEnough={this.state.notEnough} 
                  activeChange={this.state.activeChange} 
                  rates={this.props.rates} 
                  pocket={this.props.pocket} 
                  type="start" 
                  onInputChange={this.onInputChange} 
                  setCurrentCurrency={this.setCurrentCurrency} />
        <Currency {...this.state} 
                  activeChange={this.state.activeChange} 
                  rates={this.props.rates} 
                  pocket={this.props.pocket} 
                  type="end" 
                  onInputChange={this.onInputChange} 
                  setCurrentCurrency={this.setCurrentCurrency} />
      </div>
    );
  }
}

App.propTypes = {
  rates: PropTypes.object.isRequired,
  pocket: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let availableCurrencies = ['USD','RUB','EUR'],
      rates = {};

  availableCurrencies.forEach(function(cur){
    if (state.rates&&state.rates[cur]){
      rates[cur] = state.rates[cur];
    }
  });

  return {
    pocket: state.pocket,
    rates: rates
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(exchangeActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);





