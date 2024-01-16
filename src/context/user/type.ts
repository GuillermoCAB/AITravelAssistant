import { ChatCompletionRequestMessage } from 'openai';
import { ISchedule } from '../../types/schedule';
import { IUser } from '../../types/user';
import { TokenType } from '../../types/services';
import { MutableRefObject } from 'react';
import { ICar } from '../../types/cars';

export enum PanelMenuValues {
  car = 'car',
  schedule = 'schedule',
}

export type UserContextType = {
  messages: ChatCompletionRequestMessage[];
  user: Partial<IUser>;
  schedule: ISchedule[];
  panelMenu: PanelMenuValues;
  selectedCar: ICar;
  panelIsLoading: boolean;
  token: MutableRefObject<TokenType>;
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
  setSelectedCar: (schedule: ICar | ((prevState: ICar) => ICar)) => void;
  setPanelIsLoading: (
    loading: boolean | ((prevState: boolean) => boolean)
  ) => void;
};
