import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { type AxiosError } from 'axios';
import './style.css';

import UserContext from '../../context/user/contex';

import { callOpenAI } from '../../utils/openAI';
import { parseDate, parseTime } from '../../utils/parsers';

import { MessageBoard, ChatInput, Layout, Panel } from '../../components';

import {
  ChatCompletionRequestMessageRoleEnum,
  type ChatCompletionRequestMessage,
  type CreateChatCompletionResponse,
} from 'openai';
import type {
  CancelMeetingParams,
  NewCodeParams,
  RegisterUserParams,
  ScheduleMeetingParams,
  SelectCarParams,
  UpdateInterestsParams,
  VerifyUserParams,
} from './types';

import carsArray from '../../constants/cars';
import openAIFuncs from '../../constants/openAIFuncs';
import { PanelMenuValues } from '../../context/user/type';
import {
  createSchedule,
  deleteSchedule,
  getSchedules,
} from '../../services/scheduleService';
import {
  createUser,
  sendCode,
  updateUserInterests,
  verifyUser,
} from '../../services/userService';

const Home: React.FC = () => {
  const {
    messages,
    user,
    schedule,
    token,
    setMessages,
    setUser,
    setSchedule,
    setToken,
    setSelectedCar,
    setPanelMenu,
  } = useContext(UserContext);

  const tokenRef = useRef<string | undefined>(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // MEETING LOGICS
  const scheduleMeeting = useCallback(
    async ({
      date,
      time,
      name,
      email,
      vehicle,
    }: ScheduleMeetingParams): Promise<string> => {
      console.log('tokenRef', tokenRef.current);
      if (!tokenRef.current)
        return (
          'No token need to verify user email firs. tokenRef.current: ' +
          tokenRef.current
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
          tokenRef.current
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
    [tokenRef.current]
  );

  const cancelMeeting = useCallback(
    async ({ date, time }: CancelMeetingParams): Promise<string> => {
      console.log('tokenRef', tokenRef.current);
      if (!tokenRef.current)
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
          tokenRef.current
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
    [tokenRef.current]
  );

  const getUserSchedule = useCallback(async (): Promise<string> => {
    if (!tokenRef.current) return 'No token need to verify user email first';

    try {
      let result = await getSchedules(tokenRef.current);

      setSchedule(result);
      setPanelMenu(PanelMenuValues.schedule);

      let text = '';

      result.forEach((meeting, index) => {
        if (index >= 5) return;
        if ((index = 4)) {
          return (text =
            text + ' More meetings can be seen at the Schedule tab');
        }
        text =
          text +
          ` ${index}º Scheduled Meeting is for day ${meeting.date} at ${meeting.hour}`;
      });

      return `Fetched schedules for user with success. Schedules are ${text}`;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data.message)
        return axiosError.response?.data.message;

      return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
    }
  }, [tokenRef.current]);

  // USER LOGICS
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
      setToken(response.token);
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
      if (!tokenRef.current)
        return 'Need to verify users email to get token before call this function, use requireNewCode for users that have being already registered or registerUser for new users so we can send the code via email, then ask for the code and use checkUserCode to send the code, validate user and receive back the token.';

      try {
        await updateUserInterests(interests, tokenRef.current);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data.message)
          return axiosError.response?.data.message;

        return `The API has returned a non processed error - Code: ${axiosError.code} - Error Message: ${axiosError.message} - API Response ${axiosError.response}`;
      }

      return 'Updated user interests with success';
    },
    [tokenRef.current]
  );

  // PANEL LOGICS
  const selectCar = ({ carName }: SelectCarParams): string => {
    const targetIndex = carsArray.findIndex(car => car.name === carName);

    if (targetIndex < 0)
      return `Can't find any car with the name of ${carName}`;

    setPanelMenu(PanelMenuValues.car);
    setSelectedCar(carsArray[targetIndex]);

    return `Changed UI to show ${carName} with success!`;
  };

  // MESSAGE LOGIC
  const availableFunctions: any = useMemo(() => {
    return {
      scheduleMeeting,
      selectCar,
      registerUser,
      checkUserCode,
      requireNewCode,
      updateInterests,
      cancelMeeting,
      getUserSchedule,
    };
  }, [scheduleMeeting, cancelMeeting, getUserSchedule, updateInterests]);

  const onSendMessage = useCallback(
    async (
      message: string,
      functionCall?: boolean,
      previousMessages?: any
    ): Promise<void> => {
      const useMessages = previousMessages || messages;
      const newMessage: ChatCompletionRequestMessage = {
        content: message,
        role: functionCall
          ? ChatCompletionRequestMessageRoleEnum.Function
          : ChatCompletionRequestMessageRoleEnum.User,
      };

      if (functionCall) {
        newMessage.name = 'scheduleMeeting';
      }

      const updatedMessages = [...useMessages, newMessage];

      setMessages(updatedMessages);

      const res: CreateChatCompletionResponse = await callOpenAI({
        messages: updatedMessages,
        functions: openAIFuncs,
      });

      console.log('GPT Response:', res);
      const incomingMessage = res['choices'][0]['message'];

      if (!incomingMessage) return;

      if (incomingMessage?.function_call) {
        setMessages(prevState => [...prevState, incomingMessage]);

        const functionName = incomingMessage['function_call']['name'];
        const fuctionToCall = availableFunctions[functionName as string];
        const functionArgs = JSON.parse(
          incomingMessage['function_call']['arguments'] as string
        );
        const response = await fuctionToCall(functionArgs);

        console.log(
          'GPT Function call:',
          'functionName',
          functionName,
          'fuctionToCall',
          fuctionToCall,
          'functionArgs',
          functionArgs,
          'response',
          response
        );

        return onSendMessage(response, true, [
          ...updatedMessages,
          incomingMessage,
        ]);
      }

      setMessages(prevState => [...prevState, incomingMessage]);
    },
    [availableFunctions, messages, setMessages, callOpenAI]
  );

  useEffect(() => {
    console.log('schedule', schedule);
  }, [schedule]);

  useEffect(() => {
    console.log('messages', messages);
  }, [messages]);

  return (
    <div id="Home">
      <Layout
        md="4"
        xl="4"
        display="flex"
        flexDirection="column"
        ow={{
          backgroundColor: 'var(--primary-color-transparent90)',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <MessageBoard messages={messages} />
        <ChatInput onSendMessage={onSendMessage} />
      </Layout>
      <Panel />
    </div>
  );
};

export default Home;
