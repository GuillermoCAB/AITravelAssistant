import { useCallback, useContext, useRef } from 'react';
import { AxiosError } from 'axios';
import UserContext from '../context/user/contex';
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
} from '../services/scheduleService';
import { parseDate, parseTime } from '../utils/parsers';
import { PanelMenuValues } from '../context/user/type';
import { CancelMeetingParams, ScheduleMeetingParams } from '../types/hooks';

export const useMeetingLogic = () => {
  const { schedule, token, setSchedule, setPanelMenu } =
    useContext(UserContext);

  const scheduleMeeting = useCallback(
    async ({
      date,
      time,
      name,
      email,
      vehicle,
    }: ScheduleMeetingParams): Promise<string> => {
      if (!token.current)
        return (
          'No token need to verify user email firs. tokenRef.current: ' +
          token.current
        );
      if (!date) return 'Need schedule date';
      if (!time) return 'Need schedule time';
      if (!name) return 'Need user name';
      if (!email) return 'Need user email';

      const formattedDate = parseDate({ date });
      const { formattedTime, hours } = parseTime({ time });

      // Checking if hours are in correct range
      if (hours < 8 || hours > 19) {
        return 'Invalid time range. Hours should be between 08 and 19.';
      }

      try {
        let result = await createSchedule(
          formattedDate,
          formattedTime,
          vehicle,
          token.current
        );

        let updateSchedule = [...schedule, result.schedule];

        setSchedule(updateSchedule);
        setPanelMenu(PanelMenuValues.schedule);

        return `Booked meeting for ${formattedDate} - ${formattedTime} with success.`;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data.message)
          return axiosError.response?.data.message;

        return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
      }
    },
    [token]
  );

  const cancelMeeting = useCallback(
    async ({ date, time }: CancelMeetingParams): Promise<string> => {
      if (!token.current)
        return 'No token found, you need to verify user email first, ask for the email then use the requireNewCode';
      if (!date) return 'Need schedule date';
      if (!time) return 'Need schedule time';

      const formattedDate = parseDate({ date });
      const { formattedTime, hours } = parseTime({ time });

      // Checking if hours are in correct range
      if (hours < 8 || hours > 19) {
        return 'Invalid time range. Hours should be between 08 and 19.';
      }

      try {
        let result = await deleteSchedule(
          formattedDate,
          formattedTime,
          token.current
        );

        let updateSchedule = [
          ...schedule.filter(meeting => meeting._id !== result.schedule._id),
        ];

        setSchedule(updateSchedule);
        setPanelMenu(PanelMenuValues.schedule);

        return `Canceled scheduled meeting for ${formattedDate} - ${formattedTime} with success.`;
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data.message)
          return axiosError.response?.data.message;

        return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
      }
    },
    [token]
  );

  const getUserSchedule = useCallback(async (): Promise<string> => {
    if (!token.current)
      return 'No token need to verify user email first, even if you have done the verification previously on the conversation, call requireNewCode and do the process again!';

    try {
      let result = await getSchedules(token.current);

      setSchedule(result);
      setPanelMenu(PanelMenuValues.schedule);

      let text = '';

      result.forEach((meeting, index) => {
        console.log('result data', meeting, index);
        if (index >= 5) return;
        if (index === 4) {
          return (text =
            text + ' More meetings can be seen at the Schedule tab');
        }
        text =
          text +
          ` ${index + 1}º Scheduled Meeting is for day ${meeting.date} at ${
            meeting.hour
          }`;
      });

      return `Fetched schedules for user with success. Schedules are${text}`;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data.message)
        return axiosError.response?.data.message;

      return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
    }
  }, [token]);

  return {
    scheduleMeeting,
    cancelMeeting,
    getUserSchedule,
  };
};
