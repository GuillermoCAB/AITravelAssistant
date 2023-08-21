export type ScheduleMeetingParams = {
  date: string;
  time: string;
  name: string;
  email: string;
  vehicle: string[];
};

export type CancelMeetingParams = {
  date: string;
  time: string;
};

export type SelectCarParams = {
  carName: string;
};

export type RegisterUserParams = {
  name: string;
  email: string;
};

export type VerifyUserParams = {
  code: string;
  email: string;
};

export type NewCodeParams = {
  email: string;
};

export type UpdateInterestsParams = {
  interests: [string];
};
