import { ChatCompletionRequestMessage } from 'openai';
export interface MessageBoardProps {
  messages: ChatCompletionRequestMessage[];
}

export interface MessageProps {
  message: ChatCompletionRequestMessage;
}
