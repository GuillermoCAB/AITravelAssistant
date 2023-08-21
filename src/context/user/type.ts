import { ChatCompletionRequestMessage } from 'openai';
import { ISchedule } from '../../types/schedule';
import { IUser } from '../../types/user';
import { TokenType } from '../../types/services';

export enum PanelMenuValues {
  car = 'car',
  schedule = 'schedule',
}

export type UserContextType = {
  messages: ChatCompletionRequestMessage[];
  user: Partial<IUser>;
  schedule: ISchedule[];
  panelMenu: PanelMenuValues;
  selectedCar: any;
  panelIsLoading: boolean;
  token: string | undefined;
  setMessages: (
    message:
      | ChatCompletionRequestMessage[]
      | ((
          prevState: ChatCompletionRequestMessage[]
        ) => ChatCompletionRequestMessage[])
  ) => void;
  setUser: (
    user: Partial<IUser> | ((prevState: Partial<IUser>) => Partial<IUser>)
  ) => void;
  setSchedule: (
    schedule: ISchedule[] | ((prevState: ISchedule[]) => ISchedule[])
  ) => void;
  setPanelMenu: (
    menu: PanelMenuValues | ((prevState: PanelMenuValues) => PanelMenuValues)
  ) => void;
  setSelectedCar: (schedule: any | ((prevState: any) => any)) => void;
  setPanelIsLoading: (
    loading: boolean | ((prevState: boolean) => boolean)
  ) => void;
  setToken: (token: TokenType | ((prevState: TokenType) => TokenType)) => void;
};
