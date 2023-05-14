import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Container,
  TimePiker,
  TimePikerHeader,
  TimePikerItem,
  TimePikerList,
} from './styles'

interface AvailabilitySchema {
  availabeTimes: number[]
  possibleTimes: number[]
}

interface CalendarProps {
  onSelectedDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectedDateTime }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null

  const dayAndMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<AvailabilitySchema>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectedDateTime(dateWithTime)
  }
  return (
    <Container timePicker={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePiker>
          <TimePikerHeader>
            {weekDay}, <span>{dayAndMonth}</span>
          </TimePikerHeader>
          <TimePikerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePikerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availabeTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePikerItem>
              )
            })}
          </TimePikerList>
        </TimePiker>
      )}
    </Container>
  )
}
