import React, { FC, useMemo } from 'react'
import { FormProvider } from '../core/context'
import { FormValues } from '../core/useFormData'
import { FormState } from '../store/form'

export interface FormProps {
  initialValues: FormValues
}

const Form: FC<FormProps> = props => {
  const {initialValues, children} = props

  const initialData = useMemo<FormState>(() => {
    return Object.keys(initialValues).reduce<FormState>((data: FormState, key: string) => {
      data[key] = {
        properties: {
          name: key
        },
        value: initialValues[key]
      }
      return data
    }, {})
  }, [])

  return (
    <FormProvider data={initialData}>
      {children}
    </FormProvider>
  )
}

export default Form
