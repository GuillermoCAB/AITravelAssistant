import { type AxiosError, type AxiosResponse } from 'axios';

async function withTryCatch<T>(fn: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response: AxiosResponse<T> = await fn;
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(axiosError.message);
    throw axiosError;
  }
}

export default withTryCatch;
