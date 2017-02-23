import React, { Component } from 'react';
import Slider from 'react-slick';
import './Currency.css';
import Slide from '../Slide/Slide';

class Currency extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      
    }

    
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(val){
    let currency = this.props.current;
    let payload = {};
    payload[currency] = val;
    let activeChange = Object.assign({}, this.props.activeChange,payload);
    this.props.onInputChange(activeChange);
  }

  onChange(e){
    console.log(e.target.value);
    let val = e.target.value;
    let currency = this.props.current;
    let payload = {};
    payload[currency] = +val;
    let activeChange = Object.assign({}, this.state.activeChange,payload);
    console.log(activeChange);
    this.setState({activeChange: +e.target.value});
    this.props.onInputChange(activeChange);
  }


  render() {
    console.log('activeChange Currency');
    console.log(this.props.activeChange);
    let that = this;
    let rates = this.props.rates;
    let ratesKeys = Object.keys(rates);
    let currentCurrency = this.props.type == "start" ? this.props.current : this.props.next;

    //this.slider ? this.slider.slickGoTo(ratesKeys.indexOf(currentCurrency) != -1 ? ratesKeys.indexOf(currentCurrency) : 0) : null;

    let settings = {
      dots: true,
      arrows: false,
      initialSlide: ratesKeys.indexOf(currentCurrency) != -1 ? ratesKeys.indexOf(currentCurrency) : 0,
      afterChange: function (currentSlide) {
        let currency = ratesKeys[currentSlide];
        that.props.setCurrentCurrency(currency,that.props.type);
      },
    };

    let slides = ratesKeys.map((key,i) =>
      <div key={i}>
        <Slide  {...this.props} currency={key} onInputChange={this.onInputChange} active={this.props.activeChange[key]} />
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