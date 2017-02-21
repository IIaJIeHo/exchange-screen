import React, { Component } from 'react';
import Slider from 'react-slick';
import './Currency.css';

class Currency extends Component {

  constructor(props) {
    super(props);
  
    this.state = {

    }
  }

  render() {

    let rates = this.props.rates;
    let ratesKeys = Object.keys(rates);

    let settings = {
      dots: true,
      arrows: false,
      initialSlide: ratesKeys.indexOf(this.props.current) != -1 ? ratesKeys.indexOf(this.props.current) : 0,
      afterChange: function (currentSlide) {
        console.log('after change', currentSlide); /* sent a callback to parent */
      },
    };

    let slides = ratesKeys.map((key,i) =>
      <div key={i}>
        {this.props.type == "start" ? <input type="text" /> : ''}
        <h5>{key}</h5>
        <p>{rates[key]}</p>
        <p>amount:{this.props.pocket[this.props.current]}</p>
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