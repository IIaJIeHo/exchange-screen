import React, { Component,PropTypes } from 'react';
import * as helpers from '../../helpers';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: this.props.active || ''
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props){
    let newActive = props.active || '';
    this.setState({active: newActive});
  }

  componentDidUpdate() {
    let currentSlide = helpers.getCurrentSlideNode(Object.keys(this.props.rates).length),
        currentInput = currentSlide.querySelector('.currency-input');

    console.log(currentInput);
    if (currentInput == this.input) {
      this.input.focus();
    }
  }

  onChange(e){
    let val = helpers.validateInput(e.target.value);

    this.setState({active: val});
    this.props.onInputChange(val);
  }
  

  render() {
    return (
        <div>
          <input ref={(input) => { this.input = input; }} className="currency-input" type="text" 
                  value={this.state.active} 
                  onChange={this.onChange}/>
          {this.props.notEnough&&(this.state.active > 0) ? <div className="currency-alert" >Not enough money</div> : ''}
        </div>
    );
  }
}

CurrencyInput.propTypes = {
  active: PropTypes.string,
  notEnough: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  shouldFocus: PropTypes.bool
};

export default CurrencyInput;