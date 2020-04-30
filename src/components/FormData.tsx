import React from 'react'
import useFormData, { UseFormDataOptions, UseFormDataReturn } from '../core/useFormData'

export interface FormDataProps extends UseFormDataOptions {
  children: (formData: UseFormDataReturn) => React.ReactChildren
}

const FormData = (props: FormDataProps) => {
  const { children, ...options } = props
  const formData = useFormData(options)

  return children(formData)
}

export default FormData
