import React, { Component } from 'react';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: this.props.active || '0'
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps');
    let newActive = props.active || '0';
    this.setState({active: newActive});
  }

  onChange(e){
    let val = +e.target.value;
    this.setState({active: val});
    this.props.onInputChange(val);
  }
  

  render() {
    return (
        <input type="text" value={this.state.active} onChange={this.onChange}/>
    );
  }
}

export default CurrencyInput;