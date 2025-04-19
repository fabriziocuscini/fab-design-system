import {
  type ElementType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
  createContext,
  forwardRef,
  useContext,
} from 'react'
import { cx } from 'styled-system/css'
import { type StyledComponent, isCssProperty, styled } from 'styled-system/jsx'
import type { RecipeVariantProps, RecipeConfig } from 'styled-system/types'

type Props = Record<string, unknown>
type Recipe = {
  (props?: Props): Props
  splitVariantProps: (props: Props) => [Props, Props]
}
type Slot<R extends Recipe> = keyof ReturnType<R>
type Options = { forwardProps?: string[] }

const shouldForwardProp = (prop: string, variantKeys: string[], options: Options = {}) =>
  options.forwardProps?.includes(prop) || (!variantKeys.includes(prop) && !isCssProperty(prop))

type AnyRecipe = ReturnType<typeof createRecipe>
type AnyRecipeVariants = RecipeVariantProps<AnyRecipe>
type AnyRecipeConfig = RecipeConfig<AnyRecipeVariants>

const createRecipe = <C extends RecipeConfig<any>>(config: C) => (props: RecipeVariantProps<any>) => ({ recipe: {} })

export const createStyleContext = <Recipe extends AnyRecipe>(recipe: Recipe) => {
  const StyleContext = createContext<RecipeVariantProps<Recipe> | null>(null)

  const useStyleContext = () => {
    const context = useContext(StyleContext)
    if (!context) {
      throw new Error('useStyleContext must be used within a StyleProvider')
    }
    return context
  }

  const StyleProvider = (props: React.PropsWithChildren<RecipeVariantProps<Recipe>>) => {
    const { children, ...styleProps } = props
    return <StyleContext.Provider value={styleProps as any}>{children}</StyleContext.Provider>
  }

  const withRootProvider = <P extends {}>(Component: ElementType) => {
    const StyledComponent = (props: P) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props)
      const slotStyles = recipe(variantProps) as Record<Slot<R>, string>

      return (
        <StyleContext.Provider value={slotStyles}>
          <Component {...otherProps} />
        </StyleContext.Provider>
      )
    }
    return StyledComponent
  }

  const withProvider = <T, P extends { className?: string | undefined }>(
    Component: ElementType,
    slot: Slot<R>,
    options?: Options,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
    const StyledComponent = styled(
      Component,
      {},
      {
        shouldForwardProp: (prop, variantKeys) => shouldForwardProp(prop, variantKeys, options),
      },
    ) as StyledComponent<ElementType>
    const StyledSlotProvider = forwardRef<T, P>((props, ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props)
      const slotStyles = recipe(variantProps) as Record<Slot<R>, string>

      return (
        <StyleContext.Provider value={slotStyles}>
          <StyledComponent
            {...otherProps}
            ref={ref}
            className={cx(slotStyles?.[slot], props.className)}
          />
        </StyleContext.Provider>
      )
    })
    // @ts-expect-error
    StyledSlotProvider.displayName = Component.displayName || Component.name

    return StyledSlotProvider
  }

  const withContext = <T, P extends { className?: string | undefined }>(
    Component: ElementType,
    slot: Slot<R>,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
    const StyledComponent = styled(Component)
    const StyledSlotComponent = forwardRef<T, P>((props, ref) => {
      const slotStyles = useContext(StyleContext)
      return (
        <StyledComponent {...props} ref={ref} className={cx(slotStyles?.[slot], props.className)} />
      )
    })
    // @ts-expect-error
    StyledSlotComponent.displayName = Component.displayName || Component.name

    return StyledSlotComponent
  }

  return [StyleProvider, useStyleContext, withRootProvider, withProvider, withContext] as const
}
