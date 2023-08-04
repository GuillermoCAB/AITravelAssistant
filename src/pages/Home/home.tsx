import React, { useContext, useEffect } from 'react';
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
import type { scheduleMeetingParams, selectCarParams } from './types';

import carsArray from '../../constants/cars';
import openAIFuncs from '../../constants/openAIFuncs';
import { PanelMenuValues } from '../../context/user/type';

const Home: React.FC = () => {
  const {
    messages,
    userId,
    schedule,
    setMessages,
    setUserId,
    setSchedule,
    setSelectedCar,
    setPanelMenu,
  } = useContext(UserContext);

  const scheduleMeeting = ({
    date,
    time,
    name,
    email,
    vehicle,
  }: scheduleMeetingParams): string => {
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

    if (schedule[formattedDate]?.[formattedTime]) {
      return 'Time is already booked. Please ask the client to select another timezone.';
    } else {
      let updateSchedule = { ...schedule };

      updateSchedule[formattedDate] = {
        [formattedTime]: {
          name,
          email,
          vehicle,
        },
      };

      setSchedule(updateSchedule);
      setPanelMenu(PanelMenuValues.schedule);

      return 'Booked with success';
    }
  };

  const selectCar = ({ carName }: selectCarParams): string => {
    const targetIndex = carsArray.findIndex(car => car.name === carName);

    if (targetIndex < 0)
      return `Can't find any car with the name of ${carName}`;

    setPanelMenu(PanelMenuValues.car);
    setSelectedCar(carsArray[targetIndex]);

    return `Changed UI to show ${carName} with success!`;
  };

  const availableFunctions: { [key: string]: Function } = {
    scheduleMeeting,
    selectCar,
  };

  const onSendMessage = async (
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
      const response = fuctionToCall(functionArgs);

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
  };

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
