import field, { FieldAcceptanceRule, FieldState } from './field'
import { Action } from '@4react/store/lib/types/core/StoreContext'

// interfaces

export interface FormState {
  [field: string]: FieldState<any>
}

// actions

export enum FormAction {
  ADD_FIELD = 'ADD_FIELD',
  UPDATE_FIELD = 'UPDATE_FIELD'
}

export const addField = <T>(name: string, defaultValue?: T, accept?: FieldAcceptanceRule<T>) => ({
  type: FormAction.ADD_FIELD,
  payload: { name, defaultValue, accept }
})

export const updateField = <T>(name: string, value: T, valid?: boolean) => ({
  type: FormAction.UPDATE_FIELD,
  payload: { name, value, valid }
})

// reducer

const form = (state: FormState = {}, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case FormAction.ADD_FIELD:
    case FormAction.UPDATE_FIELD:
      const oldField = state[payload.name]
      return {
        ...state,
        [payload.name]: field(oldField, action)
      }
    default:
      return state
  }
}

export default form
