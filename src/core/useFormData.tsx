import { useForm } from './context'
import isFieldValid from '../utils/isFieldValid'
import { useEffect, useState } from 'react'

export interface FormValues {
  [name: string]: any
}

export interface UseFormDataOptions {
  validate?: boolean
}

export interface UseFormDataReturn {
  values: FormValues
  valid: boolean
  validate: () => boolean
}

const useFormData = (options: UseFormDataOptions = {}): UseFormDataReturn => {
  // options
  const {
    validate: validateOnChange = true
  } = options

  // context
  const { data } = useForm()

  // states
  const [values, setValues] = useState<FormValues>({})
  const [valid, setValid] = useState<boolean>(false)

  useEffect(() => {
    const newValues = Object.keys(data).reduce<FormValues>(
      (values: FormValues, key: string) => {
        values[key] = data[key].value
        return values
      },
      {}
    )
    setValues(newValues)

    if (validateOnChange) {
      validate()
    }
  }, [data])

  const validate = (): boolean => {
    const newIsValid = !Object.keys(data).some(key => {
      const field = data[key]
      if (field.properties.accept) {
        return !isFieldValid(field.value, field.properties.accept)
      }
      return true
    })
    setValid(newIsValid)
    return newIsValid
  }

  return { values, valid, validate }
}

export default useFormData
