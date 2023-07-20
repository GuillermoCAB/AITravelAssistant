import { ChatCompletionRequestMessage } from 'openai';

export type ScheduleType = {
  [key: string]: {
    [key: string]: {
      name: string;
      email: string;
      vehicle: string;
    };
  };
};

export type UserContextType = {
  messages: ChatCompletionRequestMessage[];
  userId: string;
  schedule: ScheduleType;
  setMessages: (
    message:
      | ChatCompletionRequestMessage[]
      | ((
          prevState: ChatCompletionRequestMessage[]
        ) => ChatCompletionRequestMessage[])
  ) => void;
  setUserId: (userId: string | ((prevState: string) => string)) => void;
  setSchedule: (
    schedule: ScheduleType | ((prevState: ScheduleType) => ScheduleType)
  ) => void;
};
