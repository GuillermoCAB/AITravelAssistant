import { CreateChatCompletionRequest } from 'openai';

export type CallOpenAIParams = Omit<CreateChatCompletionRequest, 'model'> &
  Partial<Pick<CreateChatCompletionRequest, 'model'>>;
