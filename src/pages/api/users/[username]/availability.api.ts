import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(404).end()
  }

  // retorno da URL
  const username = String(req.query.username)
  // Data selecionada
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date not privided.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' })
  }

  const referenceDate = dayjs(String(date))

  // verificação se a data já passou
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({ possibleTimes: [], availabeTimes: [] })
  }

  // buscando disponibilidade do dia
  const userTimeAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userTimeAvailability) {
    return res.json({ possibleTimes: [], availabeTimes: [] })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userTimeAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  // retorna a possibilidade para marcar horário
  const possibleTimes = Array.from({
    length: endHour - startHour,
  }).map((_, i) => {
    return startHour + i
  })

  // buscando as horas que já foram marcadas
  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  // validação de horario marcado
  const availabeTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )

    const isTimePassed = referenceDate.set('hour', time).isBefore(new Date())

    return !isTimeBlocked && !isTimePassed
  })

  // no next só é retornado esse tipo e como json
  return res.json({ possibleTimes, availabeTimes })
}
