import React, { useContext, useEffect } from 'react';
import './style.css';
import UserContext from '../../context/user/contex';
import ResponsiveImage from '../ResponsiveImage';

const PanelLoader: React.FC = ({}) => {
  const { panelIsLoading, setPanelIsLoading } = useContext(UserContext);

  useEffect(() => {
    setInterval(() => {
      setPanelIsLoading(prev => !prev);
    }, 10000);
  }, []);

  return (
    <div className={`panelLoader ${panelIsLoading ? 'isLoading' : ''}`}>
      <ResponsiveImage
        src={'/images/logo/img.png'}
        alt="Audi Logo for Loader"
        width={188.5}
        height={95.5}
      />
    </div>
  );
};

export default PanelLoader;
