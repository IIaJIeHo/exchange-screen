import React, { Component, PropTypes } from 'react';
import * as exchangeActions from '../../actions/exchangeActions';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Currency from '../Currency/Currency';
import Header from '../Header/Header';
import Numbers from '../Numbers/Numbers';
import './App.css';

/* make should component update in all components*/
/* optimise code in all componenent */
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

    console.log('this.props.rates');
    console.log(this.props.current);

    this.onExchange = this.onExchange.bind(this);
    this.setCurrentCurrency = this.setCurrentCurrency.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.notEnough = this.notEnough.bind(this);
    this.props.actions.startRatesAsync();
  }

  notEnough(activeChange,pocket,currency){
    console.log('not Enough');
    console.log(activeChange);
    console.log(currency);
    console.log(activeChange[currency]);
    console.log(pocket);
    if ((!activeChange[currency])||(activeChange[currency] <= 0 )||(activeChange[currency] > pocket[currency])){
      console.log('notEnough: true');
      this.setState({notEnough: true});
    } else {
      console.log('notEnough: false');
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
    e.preventDefault();
    this.setState({activeChange: {}});
  }

  onExchange(e){
    console.log(this.props.actions);
    e.preventDefault();
    let pocket = this.props.pocket;
    
    let active = this.state.activeChange;
    let current = this.state.current;
    let next = this.state.next; /* Сделать разборку */
    let base = {};
    base[current] = Math.round((pocket[current] - active[current])*100)/100;
    base[next] = Math.round((pocket[next] + active[current]*this.props.rates[next]/this.props.rates[current])*100)/100;
    pocket = Object.assign({},pocket,base);
    console.log('new  pocket!!!!');
    console.log(pocket);
    this.notEnough(this.state.activeChange,pocket,this.state.current);
    this.props.actions.updatePocket(pocket);
  }

  setCurrentCurrency(currency,type) {
    type == "start" ? this.setState({current: currency}) : this.setState({next: currency});
    if (type == "start") {
      this.notEnough(this.state.activeChange,this.props.pocket,currency);
      if (currency ==  this.state.next) {
        let rates = Object.keys(this.props.rates);
        let nextIndex = rates.indexOf(this.state.next);
        let newNext = rates[nextIndex - 1];
        console.log('newNext');
        console.log(newNext);
        this.setState({next: newNext});
        console.log('next next next');
        
      }
    } else {
      if (currency ==  this.state.current) {
        let rates = Object.keys(this.props.rates);
        let nextIndex = rates.indexOf(this.state.current);
        let newCurrent = rates[nextIndex - 1];
        console.log('newCurrent');
        console.log(newCurrent);
        this.setState({current: newCurrent});
        console.log('current current current');
      }
    }

  }


  render() {

    var settings = {
      dots: true
    };

    return (
      <div className="App">
        <Header onCancel={this.onCancel} notEnough={this.state.notEnough} onExchange={this.onExchange} rates={this.props.rates} current={this.state.current} next={this.state.next}/>
        <Currency {...this.state} notEnough={this.state.notEnough} activeChange={this.state.activeChange} rates={this.props.rates} pocket={this.props.pocket} type="start" onInputChange={this.onInputChange} setCurrentCurrency={this.setCurrentCurrency} />
        <Currency {...this.state} activeChange={this.state.activeChange} rates={this.props.rates} pocket={this.props.pocket} type="end" onInputChange={this.onInputChange} setCurrentCurrency={this.setCurrentCurrency}/>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps');
  console.log(state);

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





