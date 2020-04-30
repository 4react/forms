import { createStore } from '@4react/store'
import form, { FormData } from '../store/form'

export const [FormProvider, useForm] = createStore<FormData>(form)
