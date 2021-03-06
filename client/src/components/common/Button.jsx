import React from 'react';
import PropTypes from 'prop-types';


/**
 * Button Component
 * @param {object} props
 * @returns {JSX} jsx representation of the component
 */
const Button = ({ onClick, className, text, icon, disabled }) => (
    <button
      id={text.split(' ').join('-')}
      onClick={onClick}
      className={className}
      type="submit"
      disabled={disabled}>
      {text}
      {icon && <i className="material-icons right">{icon}</i>}
    </button>
  );

Button.PropTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;

