export enum SenderType {
  AI,
  USER,
}

export interface IMessage {
  id: string;
  text: string;
  sender: SenderType;
}

export interface MessageBoardProps {
  messages: IMessage[];
}

export interface MessageProps {
  message: IMessage;
}
