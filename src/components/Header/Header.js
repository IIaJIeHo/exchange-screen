import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <a href="#" onClick={this.props.onCancel}>cancel</a>
        1 {this.props.current} = {this.props.rates[this.props.next]/ this.props.rates[this.props.current] }
        <a href="#" onClick={this.props.onExchange}>exchange</a>
      </div>
    );
  }
}

export default Header;