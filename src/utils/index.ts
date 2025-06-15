import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { DayId, type Assert } from '../types';

export type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const dateToDateId = (date:Dayjs): DayId =>{
  return DayId(date.format('YYYY-MM-DD'));
};

export const chunkArray = <T>(array: T[], chunkSize: number): T[][]=> {
  if (chunkSize <= 0) throw new Error('chunkSize must be greater than 0');

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
};

export const assert: Assert = (condition, msg = 'Assertion failed') => {
  if (!condition) {
    throw new Error(msg);
  }
};

type SortDirection = 'asc' | 'desc';
type SortDatesProps<T> = {
  dates: T[],
  getValue?: (item: T) => string | Dayjs ,
  direction?: SortDirection ,
}

export function sortDates<T = Dayjs | string>({
  dates,
  direction = 'asc',
  getValue = (item) => item as string | Dayjs,
}:SortDatesProps<T>): T[] {
  return [...dates].sort((a, b) => {
    const dateA = dayjs(getValue(a));
    const dateB = dayjs(getValue(b));

    if (!dateA.isValid() || !dateB.isValid()) return 0;

    const comparison = dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;

    return direction === 'asc' ? comparison : -comparison;
  });
}

