import { useCallback, useContext } from 'react';
import { AxiosError } from 'axios';
import UserContext from '../context/user/contex';
import {
  createUser,
  sendCode,
  updateUserInterests,
  verifyUser,
} from '../services/userService';
import {
  NewCodeParams,
  RegisterUserParams,
  UpdateInterestsParams,
  VerifyUserParams,
} from '../types/hooks';

export const useUserLogic = () => {
  const { token, setUser } = useContext(UserContext);

  const registerUser = async ({
    name,
    email,
  }: RegisterUserParams): Promise<string> => {
    if (!email) return 'Need user email';
    if (!name) return 'Need user name';

    try {
      await createUser(name, email);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data.message)
        return axiosError.response?.data.message;

      return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
    }

    return 'Registered user with success, now need to verify user email. We have sent a code to user email, ask for that code and then call verifyUser using that code to verify the user and generate the bearer token for futher API calls';
  };

  const checkUserCode = async ({
    code,
    email,
  }: VerifyUserParams): Promise<string> => {
    if (!email) return 'Need user email';
    if (!code) return 'Need code';

    try {
      let response = await verifyUser(email, code);

      setUser(response.user);
      token.current = response.token;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data.message)
        return axiosError.response?.data.message;

      return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
    }

    return 'Code verified with success, user was logged and bearer token is now available.';
  };

  const requireNewCode = async ({ email }: NewCodeParams): Promise<string> => {
    if (!email) return 'Need user email';

    try {
      await sendCode(email);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data.message)
        return axiosError.response?.data.message;

      return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
    }

    return 'Code sent to user email';
  };

  const updateInterests = useCallback(
    async ({ interests }: UpdateInterestsParams): Promise<string> => {
      if (!interests) return 'Need user interests';
      if (!token.current)
        return 'Need to verify users email to get token before call this function, use requireNewCode for users that have being already registered or registerUser for new users so we can send the code via email, then ask for the code and use checkUserCode to send the code, validate user and receive back the token.';

      try {
        await updateUserInterests(interests, token.current);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data.message)
          return axiosError.response?.data.message;

        return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
      }

      return 'Updated user interests with success';
    },
    [token]
  );

  return {
    registerUser,
    checkUserCode,
    requireNewCode,
    updateInterests,
  };
};
