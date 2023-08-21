import React, { ReactNode, useContext } from 'react';
import UserContext from '../../context/user/contex';
import Typograph from '../Typograph';

const Calendar: React.FC = () => {
  const { schedule } = useContext(UserContext);

  const renderSchedule = (): ReactNode => {
    let result: ReactNode[] = [];

    schedule.map(meeting => {
      return result.push(
        <div className="scheduleItem">
          <Typograph type="p">
            {meeting.date} - {meeting.hour} - Vehicle: {meeting.vehicle}
          </Typograph>
        </div>
      );
    });

    return result;
  };

  return (
    <div>
      <Typograph textAlign="center" type="h4">
        Scheduled test drives:
      </Typograph>
      {renderSchedule()}
    </div>
  );
};

export default Calendar;
