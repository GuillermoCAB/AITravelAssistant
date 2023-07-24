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
import type { scheduleMeetingParams } from './types';

const openAIFunctions = [
  {
    name: 'scheduleMeeting',
    description:
      'Schedule a meeting for the user on the nearest Audi store. If the desired time is already booked then return an error message',
    parameters: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description:
            'The date the user wants to visit. Should follow the format mm/dd/yyyy',
        },
        time: {
          type: 'string',
          description:
            'The time the user wants to visit. We use the 24 hours model, also it only works from 08 until 19. Should follow the format hh:mm',
        },
        name: {
          type: 'string',
          description:
            'The name of the user so we can add on the booked time info',
        },
        email: {
          type: 'string',
          description:
            'The email of the user so we can add on the booked time info',
        },
        vehicle: {
          type: 'string',
          description:
            'The name of the vehicle the user wants to do the test drive. Can add multiple names, can add as much informations as you have, for example if you have the trim, the model, and any other subtype add here.',
        },
      },
      required: ['date', 'time', 'name', 'email', 'vehicle'],
    },
  },
];

const Home: React.FC = () => {
  const { messages, userId, schedule, setMessages, setUserId, setSchedule } =
    useContext(UserContext);

  const scheduleMeeting = ({
    date,
    time,
    name,
    email,
    vehicle,
  }: scheduleMeetingParams): string => {
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

      return 'Booked with success';
    }
  };

  const availableFunctions: { [key: string]: Function } = {
    scheduleMeeting,
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
      functions: openAIFunctions,
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
