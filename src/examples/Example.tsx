import { ComponentProps } from 'react'

const Example = (props: ComponentProps<'div'>) => {
  const { children, ...rest } = props
  return <div {...rest}>{children}</div>
}

export default Example
