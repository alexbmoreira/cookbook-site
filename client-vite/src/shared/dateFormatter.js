import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(calendar)

export default function dateFormatter(date) {
  const timezone = dayjs.tz.guess()
  const zonedDate = dayjs(date).tz(timezone)

  return zonedDate.calendar(null, {
    sameDay: '[Today at] h:mm A',
    lastDay: '[Yesterday at] h:mm A',
    sameElse: 'ddd MMM D, YYYY [at] h:mm A'
  })
}
