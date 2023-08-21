import axios from 'axios';
import withTryCatch from '../utils/withTryCatch';
import { IVerifyUserResponse } from '../types/user';
import { IResponse } from '../types/services';

// @ts-ignore
const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export async function createUser(
  name: string,
  email: string
): Promise<IResponse> {
  return withTryCatch(axios.post(`${API_URL}/register`, { name, email }));
}

export async function verifyUser(
  email: string,
  code: string
): Promise<IVerifyUserResponse> {
  return withTryCatch(axios.post(`${API_URL}/verify`, { email, code }));
}

export async function sendCode(email: string): Promise<IResponse> {
  return withTryCatch(axios.post(`${API_URL}/sendcode`, { email }));
}

export async function updateUserInterests(
  interests: string[],
  token: string
): Promise<IResponse> {
  return withTryCatch(
    axios.put(
      `${API_URL}/interests`,
      { interests },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
}
