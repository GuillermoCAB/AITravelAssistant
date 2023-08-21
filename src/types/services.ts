import { ISchedule } from './schedule';

export interface IResponse {
  message: string;
  schedule: ISchedule;
}

export type TokenType = string | undefined;
