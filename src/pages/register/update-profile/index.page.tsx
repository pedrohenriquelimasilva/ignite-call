import { api } from '@/lib/axios'
import { buildNextAuthOpitions } from '@/pages/api/auth/[...nextauth].api'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../style'
import { ProfileBox, FormAnnotation } from './style'
import { NextSeo } from 'next-seo'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateFormData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateFormData) {
    const { bio } = data

    await api.put('/users/profile', { bio })

    await router.push(`/schedule/${session.data?.user.username}`)
  }
  return (
    // essa é a forma de adicionar SEO ao nextJS
    <>
      <NextSeo title="Finalizando cadastro | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Defina sua disponibilidade</Heading>
          <Text size="sm">
            Por último, uma breve descrição e uma foto de perfil.
          </Text>
          <MultiStep currentStep={4} size={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Foto de perfil</Text>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.name}
            />
          </label>

          <label>
            <Text>Sobre você</Text>
            <TextArea {...register('bio')} />

            <FormAnnotation>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOpitions(req, res),
  )
  return {
    props: {
      session,
    },
  }
}
