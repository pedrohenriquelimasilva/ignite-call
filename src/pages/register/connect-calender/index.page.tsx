// import { api } from '@/lib/axios'
import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../style'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { NextSeo } from 'next-seo'

export default function ConnectCalender() {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error

  const isSignedIn = session.status === 'authenticated'

  async function handleConnect() {
    await signIn('google')
  }

  async function handleIsAuthenticated(isSign: boolean) {
    if (isSign) {
      await router.push('/register/time-intervals')
    }
  }

  return (
    <>
      <NextSeo title="Concetar cadastro | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Gloogle Calendar</Text>

            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado <Check />
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleConnect}>
                Conectar <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}
          <Button
            type="submit"
            disabled={!isSignedIn}
            onClick={() => handleIsAuthenticated(isSignedIn)}
          >
            Próximo passo <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
