import dayjs from 'dayjs';
import { validate as validateUUID } from 'uuid';

export type Branded<T, Brand extends string> = T & { __brand: Brand };
export type Assert = <T>(condition: T, msg?: string) => asserts condition is NonNullable<T>;

const initializeTypeGuarded = <T, U>(
  value: T,
  isValid: (value: unknown) => value is U,
  label: string,
): U => {
  if (!isValid(value)) {
    throw new Error(`Invalid ${label}: ${value}`);
  }

  return value;
};


export type DayId = Branded<string, 'DayId'>

export const isDayId = (id:unknown): id is DayId => {
  return (
    typeof id === 'string' &&
    dayjs(id, 'YYYY-MM-DD', true).isValid()
  );
};
export const DayId = (id:unknown) => initializeTypeGuarded(id,isDayId,'DayId');

export type TaskId = Branded<string, 'TaskId'>

export const isTaskId = (id:unknown): id is TaskId => {
  return (
    typeof id === 'string' &&
    validateUUID(id)
  );
};

export const TaskId = (id:unknown) => initializeTypeGuarded(id,isTaskId,'TaskId');


export type Task = {
  id: TaskId;
  title: string;
  date: string;
  tags?: string[];
  color?: string;
  completed?: boolean;
  description?: string;
  pinned?: boolean;
}

export type FetchedHoliday = {
  date: string,
  localName: string,
  name: string,
  countryCode: string,
  fixed: boolean,
  global: boolean
}

export type Holiday = {
  id: string;
  date: string;
  name: string;
}

export type FetchedCountries = {
  name: string;
  countryCode: string;
}[]
