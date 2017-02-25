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
    this.onInputChangeResult = this.onInputChangeResult.bind(this);
  }

  onInputChange(val){
    let currency = this.props.current;
    let payload = {};
    payload[currency] = val;
    let activeChange = Object.assign({}, this.props.activeChange,payload);
    this.props.onInputChange(activeChange);
  }

  onInputChangeResult(val){
    console.log('onInputChangeResult');
    console.log(val);
    let newVal = val*this.props.rates[this.props.current]/this.props.rates[this.props.next];
    console.log(newVal);
    newVal = Math.ceil(newVal*100);
    console.log(newVal);
    newVal = newVal/100;
    console.log(newVal);
    this.onInputChange(newVal);
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

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps props props');
    console.log(props);
    let rates = Object.keys(props.rates);

    if (props.type == "start"){
      this.slider.slickGoTo(rates.indexOf(props.current));
    } else {
      this.slider.slickGoTo(rates.indexOf(props.next));
    }
    
  }


  render() {
    console.log('activeChange Currency');
    console.log(this.props.activeChange);
    let that = this;
    let rates = this.props.rates;
    let ratesKeys = Object.keys(rates);
    let currentCurrency = this.props.type == "start" ? this.props.current : this.props.next;
    console.log('currentCurrency123');
    console.log(currentCurrency);
    //this.slider ? this.slider.slickGoTo(ratesKeys.indexOf(currentCurrency) != -1 ? ratesKeys.indexOf(currentCurrency) : 0) : null;

    let settings = {
      dots: true,
      arrows: false,
      initialSlide: ratesKeys.indexOf(currentCurrency) != -1 ? ratesKeys.indexOf(currentCurrency) : 0,
      beforeChange: function(i,e){
        console.log('beforeChange');
        console.log(i);
        console.log(e);
      },
      afterChange: function (currentSlide) {
        let currency = ratesKeys[currentSlide];
        that.props.setCurrentCurrency(currency,that.props.type);
      },
    };

    let slides = ratesKeys.map((key,i) =>
      <div key={i}>
        <Slide  {...this.props} 
                currency={key} 
                notEnough={this.props.notEnough} 
                onInputChange={this.onInputChange} 
                onInputChangeResult={this.onInputChangeResult} 
                active={this.props.activeChange[key]} />
      </div>
      );

    return (
      <div className={this.props.type == 'start' ? 'currency' : 'currency darken'}>
        <Slider ref={(input) => { this.slider = input; }}  {...settings}>
          {slides}
        </Slider>
      </div>
    );
  }
}

export default Currency;