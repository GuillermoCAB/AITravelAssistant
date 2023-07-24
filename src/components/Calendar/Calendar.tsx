import React, { ReactNode, useContext } from 'react';
import UserContext from '../../context/user/contex';
import Typograph from '../Typograph';

const Calendar: React.FC = () => {
  const { schedule } = useContext(UserContext);

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
    <div>
      <Typograph type="h4">Scheduled test drives:</Typograph>
      {renderSchedule()}
    </div>
  );
};

export default Calendar;
