import { FieldAcceptanceRule } from '../store/field'

const isFieldValid = <T>(value: T | undefined, accept: FieldAcceptanceRule<T>): boolean => {
  if (accept instanceof RegExp) {
    if (["string", "number"].includes(typeof  value)) {
      const matches = accept.exec(String(value))
      return !!matches && matches.length > 0
    }
    return false
  }

  return accept(value)
}

export default isFieldValid
