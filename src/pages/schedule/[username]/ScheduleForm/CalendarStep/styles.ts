import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  padding: 0,
  margin: '$6 auto 0',
  display: 'grid',
  position: 'relative',
  maxWidth: '100%',

  variants: {
    timePicker: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePiker = styled('div', {
  padding: '$6 $6 0',
  borderLeft: '1px solid $gray600',
  overflowY: 'scroll',

  // hack para fazer um componente se adequar ao pai sem setar uma altura padrão
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,
})
export const TimePikerHeader = styled(Text, {
  fontWeight: '$medium',
  marginBottom: '$3',

  span: {
    color: '$gray200',
  },
})

export const TimePikerList = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media(max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

export const TimePikerItem = styled('button', {
  color: '$gray100',
  background: '$gray600',
  borderRadius: '$sm',
  cursor: 'pointer',
  padding: '$2 0',
  border: 0,
  fontSize: '$sm',
  lineHeight: '$base',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:last-child': {
    marginBottom: '$6',
  },
})
