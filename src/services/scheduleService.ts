import axios from 'axios';
import withTryCatch from '../utils/withTryCatch';
import { ISchedule } from '../types/schedule';
import { IResponse } from '../types/services';

// @ts-ignore
const API_URL = `${import.meta.env.VITE_API_URL}/schedules`;

export async function createSchedule(
  date: string,
  hour: string,
  vehicle: string[],
  token: string
): Promise<IResponse & { schedule: ISchedule }> {
  return withTryCatch(
    axios.post(
      `${API_URL}/meeting`,
      { date, hour, vehicle },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
}

export async function deleteSchedule(
  date: string,
  hour: string,
  token: string
): Promise<IResponse> {
  return withTryCatch(
    axios.delete(`${API_URL}/meeting`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { date, hour },
    })
  );
}

export async function getSchedules(token: string): Promise<ISchedule[]> {
  return withTryCatch(
    axios.get(`${API_URL}/meeting`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
}
