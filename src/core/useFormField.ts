import { useEffect, useMemo, useState } from 'react'
import flatten from 'lodash/flatten'
import { FieldAcceptanceRule } from '../store/field'
import { useForm } from './context'
import { addField, updateField } from '../store/form'
import isFieldValid from '../utils/isFieldValid'

export enum FormFieldValidateOn {
  INIT = 'init',
  UPDATE = 'update'
}

export interface UseFormFieldOptions<T> {
  defaultValue?: T,
  accept?: FieldAcceptanceRule<T>
  validateOn?: FormFieldValidateOn | FormFieldValidateOn[]
}

export interface UseFormFieldReturn<T> {
  value: T | undefined
  update: (newValue: T) => void
  valid: boolean
}

const useFormField = <T>(
  name: string,
  options: UseFormFieldOptions<T> = {}
): UseFormFieldReturn<T> => {
  // options
  const {
    defaultValue,
    accept,
    validateOn = FormFieldValidateOn.UPDATE
  } = options

  // validation options
  const validationMoments = flatten([validateOn])
  const validateOnInit = useMemo(() => validationMoments.includes(FormFieldValidateOn.INIT), [])
  const validateOnUpdate = useMemo(() => validationMoments.includes(FormFieldValidateOn.UPDATE), [])

  // context
  const { dispatch } = useForm()

  // states
  const [value, setValue] = useState<T|undefined>(defaultValue)
  const [valid, setValid] = useState<boolean>(true)

  useEffect(() => {
    dispatch(addField(name, defaultValue, accept))
    if (accept && validateOnInit) {
      setValid(isFieldValid(defaultValue, accept))
      dispatch(updateField(name, defaultValue, valid))
    }
  }, [])

  const update = (newValue: T) => {
    setValue(newValue)
    let newValid
    if (accept && validateOnUpdate) {
      newValid = isFieldValid(newValue, accept)
      setValid(newValid)
    }
    dispatch(updateField(name, newValue, newValid))
  }

  return { value, update, valid }
}

export default useFormField
