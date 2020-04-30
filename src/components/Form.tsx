import React, { FC } from 'react'
import { FormProvider } from '../core/context'

export interface FormProps {
  // empty
}

const Form: FC<FormProps> = props => {
  const { children } = props
  return (
    <FormProvider>
      {children}
    </FormProvider>
  )
}

export default Form
