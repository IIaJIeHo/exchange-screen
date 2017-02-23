import React, { Component, PropTypes } from 'react';
import * as exchangeActions from '../../actions/exchangeActions';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Currency from '../Currency/Currency';
import Header from '../Header/Header';
import Numbers from '../Numbers/Numbers';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      current: "EUR",
      next: "RUB",
      activeChange : {
        "USD": 15
      }
    }

    console.log('this.props.rates');
    console.log(this.props.current);

    this.onExchange = this.onExchange.bind(this);
    this.setCurrentCurrency = this.setCurrentCurrency.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.props.actions.startRatesAsync();
  }

  onInputChange(newActiveChange){
    this.setState({activeChange: newActiveChange});
  }

  onCancel(e){
    e.preventDefault();
    console.log('activeChange');
    console.log(this.state.activeChange);
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
    base[current] = pocket[current] - active[current];
    base[next] = pocket[next] + active[current]*this.props.rates[next]/this.props.rates[current];
    console.log('old pocket');
    console.log(pocket);
    pocket = Object.assign({},pocket,base);
    console.log(active[current]+' '+this.props.rates[next] + ' '+ this.props.rates[current]);
    console.log('new pocket');
    console.log(pocket);
    this.props.actions.updatePocket(pocket);
  }

  setCurrentCurrency(currency,type) {
    type == "start" ? this.setState({current: currency}) : this.setState({next: currency});
  }


  render() {

    var settings = {
      dots: true
    };

    return (
      <div className="App">
        <Header onCancel={this.onCancel} onExchange={this.onExchange} rates={this.props.rates} current={this.state.current} next={this.state.next}/>
        <Currency {...this.state} activeChange={this.state.activeChange} rates={this.props.rates} pocket={this.props.pocket} type="start" onInputChange={this.onInputChange} setCurrentCurrency={this.setCurrentCurrency} />
        <Currency {...this.state} activeChange={this.state.activeChange} rates={this.props.rates} pocket={this.props.pocket} type="end" setCurrentCurrency={this.setCurrentCurrency}/>
        <Numbers />
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





