import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ConfirmAcctions,
  ConfirmContainer,
  ConfirmError,
  ConfirmHeader,
  ConfirmHeaderItem,
} from './styles'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const confirmStepSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O usuário precisa ter 3 letras no mínimo' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmStepFormData = z.infer<typeof confirmStepSchema>

interface ConfirmStepProps {
  dateTime: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  dateTime,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(confirmStepSchema),
  })

  const date = dayjs(dateTime).format('DD[ de ]MMMM[ de ]YYYY')

  const hour = dayjs(dateTime).format('HH:mm[h]')

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmStepFormData) {
    const { name, email, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: dateTime,
    })

    onCancelConfirmation()
  }
  return (
    <ConfirmContainer
      as="form"
      onSubmit={handleSubmit(handleConfirmScheduling)}
    >
      <ConfirmHeader>
        <ConfirmHeaderItem>
          <CalendarBlank /> {date}
        </ConfirmHeaderItem>
        <ConfirmHeaderItem>
          <Clock /> {hour}
        </ConfirmHeaderItem>
      </ConfirmHeader>

      <label>
        <Text size="sm">Seu nome</Text>
        <TextInput placeholder="seu usuário" {...register('name')} />
        {errors.name && <ConfirmError>{errors.name.message}</ConfirmError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          placeholder="johndoe@exemplo.com"
          type="email"
          {...register('email')}
        />
        {errors.email && <ConfirmError>{errors.email.message}</ConfirmError>}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <ConfirmAcctions>
        <Button variant="tertiary" type="button" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitted}>
          Confirmar
        </Button>
      </ConfirmAcctions>
    </ConfirmContainer>
  )
}
