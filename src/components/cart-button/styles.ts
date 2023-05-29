import { styled } from "@/styles";

export const ButtonWrapper = styled('button', {
  all: 'unset',
  padding: '0.75rem',
  borderRadius: 6,
  backgroundColor: '$gray800',
  lineHeight: 0,
  color: '$gray300',
  position: 'relative',
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  span: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24, 
    height: 24,
    borderRadius: 99999,
    backgroundColor: '$green500', 
    color: '$white',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    boxShadow: '0 0 0 4px $colors$gray900',
  }
})

export const CartWrapper = styled('div', {
  width: '30rem',
  height: '100vh',
  backgroundColor: '$gray800',
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 999,
  transform: 'translateX(110%)',
  transition: 'transform 0.3s',

    '&[data-visible="true"]': {
      transform: 'translateX(0%)',
    },
})

export const CloseButton = styled('button', {
  all: 'unset', 
  position: 'fixed',
  right: 24,
  top: 24,
  lineHeight: 0,
  color: '$gray500',
  cursor: 'pointer',
})

export const ContentWrapper = styled('div', {
  padding: ' 0 3rem',
  marginTop: '4.5rem',
})

export const ProductsWrapper = styled('div', {
  display: 'flex', 
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '2rem'
})

export const ProductItem = styled('div', {
  display: "flex", 
  gap: 20,

  div: {
    display: 'flex', 
    flexDirection: 'column',

    p: {
      fontSize: 18,
      color: '$gray300', 
      lineHeight: 1.6,
    },

    span: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '$gray100',
      lineHeight: 1.6,
    },

    button: {
      all: 'unset',
      color: '$green500',
      fontWeight: 'bold', 
      cursor: 'pointer',
      marginTop: 8,
      width: 'fit-content',
      '&:hover': {
        color: '$green300',
      },
    }
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 102,
  height: 94,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const SummaryWrapper = styled('div', {
  width: '100%',
  position: "fixed",
  bottom: 48,
  padding: ' 0 3rem',
  display: 'flex', 
  flexDirection: 'column',
})

export const QuantityWrapper = styled('div', {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  marginBottom: '0.5rem',

  p: {
    fontSize: '1rem'
  }, 
  span: {
    fontSize: '1.125rem'
  }
})

export const ValueWrapper = styled('div', {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  marginBottom: '0.5rem',

  p: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
  }, 
  span: {
    fontWeight: 'bold',
    fontSize: '1.5rem'
  }
})

export const FinishButton = styled('button', {
  all: 'unset', 
  padding: '1.25rem', 
  color: '$white', 
  backgroundColor: '$green500',
  borderRadius: 8,
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.125rem',
  fontWeight: 'bold',
  marginTop: '3.625rem',
  cursor: 'pointer',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  }
})