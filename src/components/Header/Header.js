import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <button href="#" onClick={this.props.onCancel}>cancel</button>
        1 {this.props.current} = {this.props.rates[this.props.next]/ this.props.rates[this.props.current] }
        <button href="#" disabled={this.props.notEnough} onClick={this.props.onExchange}>exchange</button>
      </div>
    );
  }
}

export default Header;