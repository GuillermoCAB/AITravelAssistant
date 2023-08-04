import axios from 'axios';
import withTryCatch from '../utils/withTryCatch';

interface ScheduleResponse {
  user: string;
  date: string;
  hour: string;
  vehicle: string[];
}

const API_URL = `${process.env.REACT_APP_API_URL}/schedules`;

export async function createSchedule(
  date: string,
  hour: string,
  vehicle: string[],
  token: string
): Promise<ScheduleResponse> {
  return withTryCatch(
    axios.post(
      `${API_URL}`,
      { date, hour, vehicle },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
}

export async function deleteSchedule(
  date: string,
  hour: string,
  token: string
): Promise<{ message: string }> {
  return withTryCatch(
    axios.delete(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { date, hour },
    })
  );
}

export async function getSchedules(token: string): Promise<ScheduleResponse[]> {
  return withTryCatch(
    axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
}
