export interface IUser {
  _id: string;
  name: string;
  email: string;
  interests: string[];
  schedules: string[];
  status: string;
  code: string;
}

export interface IVerifyUserResponse {
  token: string;
  user: IUser;
}
