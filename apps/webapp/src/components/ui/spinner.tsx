import { forwardRef } from 'react'
import { styled } from 'styled-system/jsx'
import { Spinner as StyledSpinner, type SpinnerProps as StyledSpinnerProps } from './styled/spinner'

export interface SpinnerProps extends StyledSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  return <StyledSpinner ref={ref} {...props} />
})

Spinner.displayName = 'Spinner' 