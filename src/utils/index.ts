import dayjs from 'dayjs';

/**
 * @abstract
 * ~ L =08/16/2018
 * ~ LL = August 16, 2018
 * ~ l = 	8/16/2018
 * ~ MMM = The abbreviated month name
 * ~ ddd DD =  The short name of the day of the week &  The day of the month, 2-digits
 * ~ MMM YYYY = the abbreviated month name & four-digit year
 */
type formatType =
  | 'L'
  | 'LL'
  | 'MMM'
  | 'ddd DD'
  | 'MMM YYYY'
  | 'h a'
  | 'DD MMM YYYY'
  | 'DD ddd, MMMM YYYY'
  | 'YYYY-MM-DD'
  | 'DD.MM.YYYY'
  | 'DD.MM.YYYY hh:mm A'
  | 'hh:mm A'
  | 'MMM DD, YYYY';

export const formatDate = (date: Date | string, format?: formatType) =>
  dayjs(new Date(date)).format(format ?? 'YYYY-MM-DD');

export const subtractDay = (date: Date | string) =>
  formatDate(dayjs(date).subtract(1, 'day').toISOString());

export const addDay = (date: Date | string) => formatDate(dayjs(date).add(1, 'day').toISOString());

export const formattedTime = (timeString: string) => {
  const time = timeString.split(':')[0];
  const timeFormat = Number(time) > 12 ? 'pm' : 'am';
  const timeCal = Number(time) > 12 ? Number(time) - 12 : Number(time);
  return `${timeCal} ${timeFormat}`;
};

export const formatTime = (timeInSeconds: number): string => {
  const result = new Date(Math.round(timeInSeconds) * 1000).toISOString().substring(11, 19);
  // if duration is over hour
  if (+result.substring(0, 2) > 0) {
    // show 00:00:00
    return result;
  } else {
    // else show 00:00
    return result.substring(3);
  }
};

export const checkNull = (data: string | null): null | string => (data?.trim() ? data : null);
