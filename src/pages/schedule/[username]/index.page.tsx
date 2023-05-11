import { prisma } from '@/lib/prisma'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ScheduleForm } from './ScheduleForm'
import { Container, UserHeader } from './styeles'
import { NextSeo } from 'next-seo'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}
export default function Schedule({ user }: ScheduleProps) {
  // colocar a biblioteca Satori, tendo em vista que o opengrafique é pra informar a imagem para o confornto
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />
      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading>{user.name} </Heading>
          <Text>{user.bio} </Text>
        </UserHeader>
        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// renderizando uma pagina statica que atualiza a cada 24 horas
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
