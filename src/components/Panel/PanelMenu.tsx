import React, { useContext } from 'react';
import './style.css';
import type { PanelMenuProps } from './type';
import UserContext from '../../context/user/contex';
import ResponsiveImage from '../ResponsiveImage';
import { PanelMenuValues } from '../../context/user/type';

const PanelMenu: React.FC<PanelMenuProps> = ({}) => {
  const { panelMenu, setPanelMenu } = useContext(UserContext);

  return (
    <div className="panelMenu">
      <div
        onClick={() => setPanelMenu(PanelMenuValues.car)}
        className={`panelMenuItem ${panelMenu === 'car' ? 'active' : ''}`}
      >
        <ResponsiveImage
          src={'/images/carIcon/img.png'}
          alt="Assistant Badge"
          width={22}
          height={22}
        />
      </div>
      <div
        onClick={() => setPanelMenu(PanelMenuValues.schedule)}
        className={`panelMenuItem ${panelMenu === 'schedule' ? 'active' : ''}`}
      >
        <ResponsiveImage
          src={'/images/calendarIcon/img.png'}
          alt="Assistant Badge"
          width={22}
          height={22}
        />
      </div>
    </div>
  );
};

export default PanelMenu;
