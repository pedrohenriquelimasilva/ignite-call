import { Box, styled, Text } from '@ignite-ui/react'

export const IntervalsBox = styled(Box, {
  padding: '$6',
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '$md',
})

export const IntervalsContainer = styled('div', {
  borderRadius: '$md',
  border: '1px solid $gray600',
  marginBottom: '$4',
})

export const IntervalsItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },
})

export const IntervalsDay = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const IntervalsInputs = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(30%)',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4',
})
