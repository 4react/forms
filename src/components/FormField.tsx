import React from 'react'
import useFormField, { UseFormFieldReturn, UseFormFieldOptions } from '../core/useFormField'

export interface FieldProps<T> extends UseFormFieldOptions<T> {
  name: string
  children: (field: UseFormFieldReturn<T>) => React.ReactChildren
}

const FormField = <T extends any>(props: FieldProps<T>) => {
  const { name, children, ...otherProps } = props
  const fieldData = useFormField<T>(name, otherProps)

  return children(fieldData)
}

export default FormField
