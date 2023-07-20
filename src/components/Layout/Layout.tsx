import React from 'react';
import './style.css';
import { LayoutProps } from './type';

const Layout: React.FC<LayoutProps> = ({
  display,
  flexDirection,
  justifyContent,
  alignItems,
  position,
  margin = '0',
  padding = '0',
  xs,
  sm,
  md,
  lg,
  xl,
  children,
  ow,
  id,
}) => {
  const style: React.CSSProperties = {
    display,
    flexDirection,
    justifyContent,
    alignItems,
    position,
    margin,
    padding,
    ...ow,
  };

  // create a class name based on props
  const className = `layout ${xs ? `xs-${xs}` : ''} ${sm ? `sm-${sm}` : ''} ${
    md ? `md-${md}` : ''
  } ${lg ? `lg-${lg}` : ''} ${xl ? `xl-${xl}` : ''}`;

  return (
    <div id={id} style={style} className={className}>
      {children}
    </div>
  );
};

export default Layout;
