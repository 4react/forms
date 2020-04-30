import { FieldAcceptanceRule } from '../store/field'

const isFieldValid = <T>(value: T | undefined, accept: FieldAcceptanceRule<T>): boolean => {
  if (accept instanceof RegExp) {
    const str: string = String(value)
    const matches = accept.exec(str)
    if (matches) {
      return matches.length > 0
    }
    return false
  }

  return accept(value)
}

export default isFieldValid
