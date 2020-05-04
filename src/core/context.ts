import { createStore } from '@4react/store'
import form, { FormState } from '../store/form'

export const [FormProvider, useForm] = createStore<FormState>(form)
