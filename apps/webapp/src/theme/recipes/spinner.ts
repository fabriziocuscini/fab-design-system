import { defineRecipe } from '@pandacss/dev'

export const spinner = defineRecipe({
  className: 'spinner',
  description: 'A loading spinner',
  base: {
    display: 'inline-block',
    borderWidth: '2px',
    borderRadius: 'full',
    borderColor: 'colorPalette.default',
    borderTopColor: 'colorPalette.fg',
    animation: 'spin 0.6s linear infinite',
    borderStyle: 'solid',
    color: 'colorPalette.default',
    w: '5',
    h: '5',
  },
  variants: {
    size: {
      xs: { w: '3', h: '3', borderWidth: '1.5px' },
      sm: { w: '4', h: '4', borderWidth: '1.5px' },
      md: { w: '5', h: '5', borderWidth: '2px' },
      lg: { w: '6', h: '6', borderWidth: '2px' },
      xl: { w: '7', h: '7', borderWidth: '2.5px' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
}) 