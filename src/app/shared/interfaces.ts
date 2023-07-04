export interface IUser {
  email: string;
  password: string;
}

export interface IMeetupResponse {
  id?: number;
  name: string;
  description: string;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
  time: string;
  duration: number;
  createdBy: 1;
  owner: {
    id: number;
    email: string;
    password: string;
    fio: string;
  };
  users: IUser[];
}

export interface IMeetup {
  name: string;
  description: string;
  time: string;
  duration: number;
  location: string;
  target_audience: string;
  need_to_know: string;
  will_happen: string;
  reason_to_come: string;
}

export interface ISubscriptionData {
  idMeetup: number | undefined;
  idUser: number;
}

export interface IUserResponse {
  id: number;
  email: string;
  password: string;
  fio: string;
}

export function combineDateTime(date: string, time: string): string {
  const combinedDate = `${date}T${time}`;
  const isoString = new Date(combinedDate).toISOString();
  return isoString;
}
