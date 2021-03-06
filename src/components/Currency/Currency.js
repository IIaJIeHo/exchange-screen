import React, { Component,PropTypes } from 'react';
import Slider from 'react-slick';
import './Currency.css';
import CurrencySlide from '../CurrencySlide/CurrencySlide';
import * as helpers from '../../helpers';

class Currency extends Component {

  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeResult = this.onInputChangeResult.bind(this);
  }

  onInputChange(val,topActive){
    let currency = this.props.current,
        payload = {},
        activeChange,
        topActiveBool = !!!topActive;

    payload[currency] = ''+val;
    activeChange = Object.assign({}, this.props.activeChange,payload);
    this.props.onInputChange(activeChange,topActiveBool);
  }

  onInputChangeResult(val){
    let newVal = Math.ceil(val*this.props.rates[this.props.current]/this.props.rates[this.props.next]*100)/100;
    this.onInputChange(newVal,true);
  }

  componentWillReceiveProps(props){
    let rates = Object.keys(props.rates);
    props.type === "start" ? this.slider.slickGoTo(rates.indexOf(props.current)) : this.slider.slickGoTo(rates.indexOf(props.next));    
  }


  render() {
    let that = this,
        rates = this.props.rates,
        ratesKeys = Object.keys(rates),
        currentCurrency = this.props.type === "start" ? this.props.current : this.props.next,
        settings,
        slides;

    settings = {
      dots: true,
      arrows: false,
      initialSlide: ratesKeys.indexOf(currentCurrency) !== -1 ? ratesKeys.indexOf(currentCurrency) : 0,
      afterChange: function (currentSlide) {
        let currency = ratesKeys[currentSlide];
        that.props.setCurrentCurrency(currency,that.props.type);
      },
    };

    slides = ratesKeys.map((key,i) =>
      <div key={i}>
        <CurrencySlide {...this.props} 
                currency={key}
                notEnough={this.props.notEnough} 
                onInputChange={this.onInputChange} 
                onInputChangeResult={this.onInputChangeResult} 
                active={this.props.activeChange[key]} />
      </div>
      );

    return (
      <div id={this.props.type === 'start' ? helpers.sliderId : ''} className={this.props.type === 'start' ? 'currency' : 'currency darken'}>
        <Slider ref={(input) => { this.slider = input; }}  {...settings}>
          {slides}
        </Slider>
      </div>
    );
  }
}

Currency.propTypes = {
  rates: PropTypes.object.isRequired,
  notEnough: PropTypes.bool.isRequired,
  activeChange: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
  topActive: PropTypes.bool.isRequired
};

export default Currency;