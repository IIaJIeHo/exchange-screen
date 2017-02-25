import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <button className="header-button" href="#" onClick={this.props.onCancel}>cancel</button>
        <span className="header-exchange">1 {this.props.current} = { (this.props.rates[this.props.next]/ this.props.rates[this.props.current]).toFixed(2) } {this.props.next} </span>
        <button className="header-button right" href="#" disabled={this.props.notEnough} onClick={this.props.onExchange}>exchange</button>
      </div>
    );
  }
}

export default Header;