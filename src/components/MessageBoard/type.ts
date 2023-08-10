import { ChatCompletionRequestMessage } from 'openai';
export interface MessageBoardProps {
  messages: ChatCompletionRequestMessage[];
}

export interface MessageProps {
  message: ChatCompletionRequestMessage;
}
export interface MessageData {
  content: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  user: string;
}
