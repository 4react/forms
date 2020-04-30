import { Action } from '@4react/store/lib/types/core/StoreContext'
import { FormAction } from './form'

// interfaces

export type FieldAcceptFunction<T> = (value: T) => boolean

export type FieldAcceptanceRule<T> = RegExp | FieldAcceptFunction<T | undefined>

export interface FieldProperties<T> {
  name: string
  accept?: FieldAcceptanceRule<T>
}

export interface FieldData<T> {
  properties: FieldProperties<T>
  value?: T
  valid?: boolean
}

// reducer

const field = <T>(state: FieldData<T>, action: Action): FieldData<T> => {
  const { type, payload } = action
  switch (type) {
    case FormAction.ADD_FIELD:
      return {
        properties: {
          name: payload.name,
          ...(payload.accept && { accept: payload.accept })
        },
        ...(payload.defaultValue && { value: payload.defaultValue })
      }
    case FormAction.UPDATE_FIELD:
      return {
        ...state,
        value: payload.value,
        ...(payload.valid && { valid: payload.valid })
      }
    default:
      return state
  }
}

export default field