import React, { Component } from 'react';
import Slider from 'react-slick';
import './Currency.css';

class Currency extends Component {
  render() {

    var settings = {
      dots: true
    };

    return (
      <div className="currency">
        <Slider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
      </div>
    );
  }
}

export default Currency;