import axios from 'axios';
import withTryCatch from '../utils/withTryCatch';

interface Response {
  message: string;
}

interface VerifyUserResponse extends Response {
  token: string;
  user: {
    name: string;
    email: string;
    interests: string[];
    schedules: string[];
    status: string;
    code: string;
  };
}

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

export async function createUser(
  name: string,
  email: string
): Promise<Response> {
  return withTryCatch(axios.post(`${API_URL}/register`, { name, email }));
}

export async function verifyUser(
  email: string,
  code: string
): Promise<VerifyUserResponse> {
  return withTryCatch(axios.post(`${API_URL}/verify`, { email, code }));
}

export async function sendCode(email: string): Promise<Response> {
  return withTryCatch(axios.post(`${API_URL}/sendcode`, { email }));
}

export async function updateUserInterests(
  interests: string[],
  token: string
): Promise<Response> {
  return withTryCatch(
    axios.put(
      `${API_URL}/interests`,
      { interests },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
}
