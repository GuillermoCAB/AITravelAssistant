import React from 'react';
import './style.css';
import type { ButtonProps } from './type';

const Button: React.FC<ButtonProps> = ({
  color = 'primary',
  size = 'regular',
  disabled = false,
  variant = 'solid',
  onClick,
  children,
}) => {
  const classes = `btn ${color} ${size} ${variant} ${
    disabled ? 'disabled' : ''
  }`;

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
