import React, { PropTypes } from 'react';
import './Header.css'

const Header = ({onCancel,onExchange,current,next,rates,notEnough}) => {
    return (
      <div className="header">
        <button className="header-button" 
                onClick={onCancel}>cancel</button>
        <span className="header-exchange">
          1 {current} = { (rates[next]/ rates[current]).toFixed(4) } {next} 
        </span>
        <button className="header-button right" 
                disabled={notEnough} 
                onClick={onExchange}>exchange</button>
      </div>
    );
}

Header.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onExchange: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
  rates: PropTypes.object.isRequired,
  notEnough: PropTypes.bool.isRequired
};

export default Header;
