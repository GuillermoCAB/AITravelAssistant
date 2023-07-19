import React from 'react';
import './style.css';
import type { TypographyProps } from './type';
import { colorMap } from '../../constants/style';
import { ColorTypes } from '../../types/style';

const Typography: React.FC<TypographyProps> = ({
  type: Component = 'p',
  color,
  bold,
  margin = '0',
  children,
}) => {
  const classes = `${Component}`;

  return (
    <Component
      className={classes}
      style={{ margin, fontWeight: bold, color: colorMap[color as ColorTypes] }}
    >
      {children}
    </Component>
  );
};

export default Typography;
