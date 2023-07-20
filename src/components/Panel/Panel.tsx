import React, { ReactNode, useContext } from 'react';
import './style.css';
import type { PanelProps } from './type';
import Layout from '../Layout';
import UserContext from '../../context/user/contex';
import Typograph from '../Typograph';

const Panel: React.FC<PanelProps> = ({}) => {
  const { userId, schedule } = useContext(UserContext);

  const renderSchedule = (): ReactNode => {
    let result: ReactNode[] = [];

    Object.keys(schedule).map(day => {
      Object.keys(schedule[day]).map(hour => {
        return result.push(
          <div className="scheduleItem">
            <Typograph type="p">
              {day} - {hour} - Vehicle: {schedule[day][hour].vehicle}
            </Typograph>
          </div>
        );
      });
    });

    return result;
  };

  return (
    <Layout
      id="Panel"
      md="8"
      xl="8"
      display="flex"
      flexDirection="column"
      ow={{
        backgroundColor: 'var(--secondary-color)',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container">
        <Typograph type="h4">Scheduled test drives:</Typograph>
        {renderSchedule()}
      </div>
    </Layout>
  );
};

export default Panel;
