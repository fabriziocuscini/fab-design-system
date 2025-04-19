import { defineRecipe } from '@pandacss/dev'

export const button = defineRecipe({
  className: 'button',
  description: 'A button styles',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    flexShrink: '0',
    fontWeight: 'semibold',
    outline: 'none',
    borderRadius: 'md',
    cursor: 'pointer',
    textDecoration: 'none',
    transitionProperty: 'color, background, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'default',
    transitionDuration: 'fast',
    _focusVisible: {
      outline: '2px solid token(colors.border.accent.default)',
      outlineOffset: '2px',
    },
    _disabled: {
      opacity: '0.4',
      cursor: 'not-allowed',
      _hover: {
        color: 'unset',
      },
    },
  },
  variants: {
    variant: {
      solid: {
        bg: 'colorPalette.default',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.emphasized',
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'colorPalette.outlineVariant',
        bg: 'transparent',
        color: 'colorPalette.text',
        _hover: {
          bg: 'colorPalette.subtleVariant',
          borderColor: 'colorPalette.outlineVariant',
        },
      },
      ghost: {
        bg: 'transparent',
        color: 'colorPalette.text',
        _hover: {
          bg: 'colorPalette.subtleVariant',
        },
      },
      link: {
        p: '0',
        h: 'auto',
        color: 'colorPalette.text',
        bg: 'transparent',
        fontWeight: 'semibold',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
    size: {
      xs: { h: '8', minW: '8', textStyle: 'xs', px: '3' },
      sm: { h: '9', minW: '9', textStyle: 'sm', px: '3.5' },
      md: { h: '10', minW: '10', textStyle: 'sm', px: '4' },
      lg: { h: '11', minW: '11', textStyle: 'md', px: '4.5' },
      xl: { h: '12', minW: '12', textStyle: 'md', px: '5' },
      '2xl': { h: '14', minW: '14', textStyle: 'lg', px: '7' },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
}) 