import React, { Component } from 'react';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: this.props.active || ''
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props){
    console.log('componentWillReceiveProps');
    let newActive = props.active || '';
    this.setState({active: newActive});
  }
  /* treat . input */

  onChange(e){
    console.log('onChange');
    console.log(e.target.value);
    let nonNumericRegex = /[^0-9.]+/g;
    let val = e.target.value.replace(nonNumericRegex, "");
    if (val === '.'){
      val = '0.';
    } else {
      let arr_val = val.split('.');
      if (arr_val.length > 1){
        val = arr_val[0]+'.'+arr_val[1].slice(0,2);
      }
    }

    console.log(val);
    this.setState({active: val});
    this.props.onInputChange(val);
  }
  

  render() {
    return (
        <div>
          <input className="currency-input" type="text" value={this.state.active} onChange={this.onChange}/>
          {this.props.notEnough ? <span className="currency-alert" >Not enough money</span> : ''}
        </div>
    );
  }
}

export default CurrencyInput;