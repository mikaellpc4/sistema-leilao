import dayjs from "dayjs"
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration);

const GetEndingAt = (endAt: number) => {
  const endAtDayjs = dayjs(endAt * 1000);
  const now = dayjs();
  const duration = dayjs.duration(endAtDayjs.diff(now))
  const endingAt = {
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
  }
  duration.format('D/HH/mm/ss').split('/').map((num,index) => {
    switch(index){
      case 0: endingAt.days = num
      case 1: endingAt.hours = num
      case 2: endingAt.minutes = num
      case 3: endingAt.seconds = num
    }
  })
  return endingAt
}

export default GetEndingAt