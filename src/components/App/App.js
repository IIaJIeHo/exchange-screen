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
      rates: {
          "EUR": 0.949485,
          "RUB": 57.767,
          "USD": 1,
        },
      current: "EUR",
      next: "RUB",
      pocket: {
        "USD": 30,
        "RUB": 10,
        "EUR": 15
      },
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
  }

  onInputChange(newActiveChange){
    this.setState({activeChange: newActiveChange});
  }

  onCancel(e){
    e.preventDefault();
    this.setState({"activeChange": {}});
  }

  onExchange(e){
    e.preventDefault();
    let pocket = this.state.pocket;
    let active = this.state.activeChange;
    let current = this.state.current;
    let next = this.state.next; /* Сделать разборку */
    pocket[current] -= active[current];
    pocket[next] += active[current]*this.state.rates[next]/this.state.rates[current];
    console.log(active[current]+' '+this.state.rates[next] + ' '+ this.state.rates[current]);
    console.log(pocket);
    active[current] = 0;
    this.setState({
      pocket: pocket,
      active: active
    });
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
        <Header onCancel={this.onCancel} onExchange={this.onExchange} rates={this.state.rates} current={this.state.current} next={this.state.next}/>
        <Currency {...this.state} type="start" onInputChange={this.onInputChange} setCurrentCurrency={this.setCurrentCurrency} />
        <Currency {...this.state} type="end" setCurrentCurrency={this.setCurrentCurrency}/>
        <Numbers />
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(exchangeActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);





