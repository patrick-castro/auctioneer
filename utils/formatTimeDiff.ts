import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'

dayjs.extend(durationPlugin)

export default function formatTimeDiff(date: string): string {
  // Today
  const currentDateTime = dayjs()
  const endDateTime = dayjs(date)

  if (currentDateTime.isAfter(endDateTime)) return '0'

  const duration = dayjs.duration(endDateTime.diff(currentDateTime))

  if (duration.asDays() >= 1) {
    const days = Math.floor(duration.asDays())
    const hours = duration.hours()
    const hoursText =
      hours === 0 ? '' : ` and ${hours} hour${hours > 1 ? 's' : ''}`

    return `${days} day${days > 1 ? 's' : ''}${hoursText}`
  } else if (duration.asHours() >= 1) {
    const hours = Math.floor(duration.asHours())
    const minutes = duration.minutes()
    const minsText =
      minutes === 0 ? '' : ` and ${minutes} min${minutes > 1 ? 's' : ''}`

    return `${hours} hour${hours > 1 ? 's' : ''}${minsText}`
  } else {
    const minutes = Math.floor(duration.asMinutes())
    return `${minutes} min${minutes > 1 ? 's' : ''}`
  }
}
