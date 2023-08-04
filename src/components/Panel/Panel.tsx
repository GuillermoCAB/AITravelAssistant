import React, { useContext, useMemo } from 'react';
import './style.css';
import type { PanelProps } from './type';
import Layout from '../Layout';
import UserContext from '../../context/user/contex';
import PanelMenu from './PanelMenu';
import Calendar from '../Calendar';
import Cars from '../Cars';
import PanelLoader from './PanelLoader';

const Panel: React.FC<PanelProps> = ({}) => {
  const { panelMenu } = useContext(UserContext);

  const renderPanelMenu = useMemo(() => {
    switch (panelMenu) {
      case 'car':
        return <Cars />;

      case 'schedule':
        return <Calendar />;

      default:
        break;
    }
  }, [panelMenu]);

  return (
    <Layout
      id="Panel"
      md="8"
      xl="8"
      display="flex"
      flexDirection="column"
      ow={{
        backgroundColor: 'var(--white-color)',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container">{renderPanelMenu}</div>
      <PanelMenu />
      <PanelLoader />
    </Layout>
  );
};

export default Panel;
