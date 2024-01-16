import { useCallback, useContext } from 'react';
import { callOpenAI } from '../utils/openAI';
import UserContext from '../context/user/contex';
import {
  ChatCompletionRequestMessageRoleEnum,
  type ChatCompletionRequestMessage,
  type CreateChatCompletionResponse,
} from 'openai';
import openAIFuncs from '../constants/openAIFuncs';

export const useMessageHandler = (availableFunctions: {
  [key: string]: Function;
}) => {
  const { messages, setMessages, setPanelIsLoading } = useContext(UserContext);

  const onSendMessage = useCallback(
    async (
      message: string,
      functionCall?: boolean,
      previousMessages?: ChatCompletionRequestMessage[]
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

      const incomingMessage = res['choices'][0]['message'];

      if (!incomingMessage) return;

      if (incomingMessage?.function_call) {
        setPanelIsLoading(true);
        setMessages(prevState => [...prevState, incomingMessage]);

        const functionName = incomingMessage['function_call']['name'];
        const fuctionToCall = availableFunctions[functionName as string];
        const functionArgs = JSON.parse(
          incomingMessage['function_call']['arguments'] as string
        );
        const response = await fuctionToCall(functionArgs);

        return onSendMessage(response, true, [
          ...updatedMessages,
          incomingMessage,
        ]);
      }

      setPanelIsLoading(false);
      setMessages(prevState => [...prevState, incomingMessage]);
    },
    [messages, setMessages, availableFunctions]
  );

  return {
    onSendMessage,
  };
};
