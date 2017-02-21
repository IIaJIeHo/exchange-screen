import React, { Component } from 'react';
import Slider from 'react-slick';
import './Currency.css';

class Currency extends Component {

  constructor(props) {
    super(props);
  
    this.state = {

    }
  }

  conversionResult(currency){
    return +this.props.activeChange * this.props.rates[currency] / this.props.rates[this.props.current];
  }

  render() {

    let rates = this.props.rates;
    let ratesKeys = Object.keys(rates);
    let currentCurrency = this.props.type == "start" ? this.props.current : this.props.next;

    let settings = {
      dots: true,
      arrows: false,
      initialSlide: ratesKeys.indexOf(currentCurrency) != -1 ? ratesKeys.indexOf(currentCurrency) : 0,
      afterChange: function (currentSlide) {
        console.log('after change', currentSlide); /* sent a callback to parent */
      },
    };

    let slides = ratesKeys.map((key,i) =>
      <div key={i}>
        {this.props.type == "start" ? <input type="text" onChange={this.props.onExchange}/> : 
         this.props.type == "end" ? <p>Result: {this.conversionResult(key)}</p> : ''}
        <h5>{key}</h5>
        <p>{rates[key]}</p>
        <p>amount:{this.props.pocket[currentCurrency]}</p>
      </div>
      );

    



    return (
      <div className="currency">
        <Slider ref={(input) => { this.slider = input; }}  {...settings}>
          {slides}
        </Slider>
      </div>
    );
  }
}

export default Currency;