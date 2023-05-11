import { Box, styled, Text } from '@ignite-ui/react'

export const ConfirmContainer = styled(Box, {
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  maxWidth: 540,

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    input: {
      color: '$gray100',
    },
  },
})
export const ConfirmHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  paddingBottom: '$6',
  borderBottom: '1px solid $gray600',
})
export const ConfirmHeaderItem = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  svg: {
    width: '$5',
    height: '$5',
    color: '$gray200',
  },
})
export const ConfirmError = styled(Text, {
  color: '#f75a68',
  fontSize: '$sm',
})

export const ConfirmAcctions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '$2',
})
