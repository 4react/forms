# @4react / forms

Ready-to-use form context and validation for React Applications.

```jsx
import { Form, FormField, FormData } from '@4react/forms'

const App = () => (
  <Form>
    <FormField name="username" accept={/^\w+$/}>
      {({ update, valid }) => <input ... />}
    </FormField>
    <FormField name="password">
      {({ update, valid }) => <input ... />}
    </FormField>
    <FormData>
      {({ values, valid }) => <button ... />}
    </FormData>
  </Form>
)
```

Live example

## Usage

### Import dependency

```
npm i @4react/forms
```

### Provide form context

Use the `Form` component to provide the context.
```jsx
import { Form } from '@4react/forms'

const App = () => (
  <Form>
    ...
  </Form>
)
```
This component brings no further structure on the layout.

### Create fields
Use the **`FormField`** component to register a new field to the current form context. 

```jsx
import { FormField } from '@4react/forms'

...

<FormField name="email">
    ...
</FormField>
```

This components accept a child function, and provides to it the following properties:

| Name | Type | Description |
| --- | --- | --- |
| update | Function | Required to update the value of the field. Classic usage is on both onChange and onBlur input events. |
| valid | boolean | Points if the field is considered valid, i.e. the last validation is passed or none is executed yet.
| value | any | The stored value of the field. For any custom usage. |

```
<FormField name="email">
  {field => <input type="text" onChange={e => field.update(e.target.name)} />}
</FormField>

<FormField name="email">
  {({ update, valid }) => (
    <input
      type="text"
      onChange={e => update(e.target.name)}
      style={{ borderColor: valid ? 'gray' : 'red' }}
    />
  )}
</FormField>
```

`FormField` accepts this properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | - | ***Required***. The name of the field |
| defaultValue | any | - | Default value for the field. |
| accept | Function, RegExp | - | If provided, this function is used to validate the value of the field. String (and compatible types) fields can use a RegExp also. |
| validateOn | "init", "update" | "update" | Use to control in which moments the validation is executed. |

### Use collected data
Use the **`FormData`** component to obtain all values of the current form.

```jsx
import { FormData } from '@4react/forms'

...
    
<FormData>
  {({ values, valid }) => <button ... />}
</FormData>
```

This components accept a child function, and provides to it the following properties:

| Name | Type | Description |
| --- | --- | --- |
| values | object | Object containing all values of the form. |
| valid | boolean | Points if the values in all the fields are considered valid. Returns false if no validation is done yet.
| validate | Function | For performance reasons it's possible to force validation only on demand. In these cases invoking this function will validate the entire form. |

##Hooks

The module also provides 2 hooks in alternative to the above components:

### useFormField
As like the `FormField` component, this hook will register a new field in the current form, and provides the same properties.
```
import { useFormField } form '@4react/forms'

const MyCustomField = ({ name }) => {
  const { value, valid, update } = useFormField(name)

  const onChange = e => {
    const filteredValue = e.target.value.trim()
    update(filteredValue)
  }

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        style={{ borderColor: valid ? 'gray' : 'red' }}
      />
      filtered: <span>{value}</span>
    </>
  )
}
```

Accepted parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | - | ***Required***. The name of the field |
| options | object | - | An object containing all the other optional props of the `FormField` component. |

Provided parameters:

| Name | Type | Description |
| --- | --- | --- |
| update | Function | Required to update the value of the field. Classic usage is on both onChange and onBlur input events. |
| valid | boolean | Points if the field is considered valid, i.e. the last validation is passed or none is executed yet.
| value | any | The stored value of the field. For any custom usage. |

### useFormData
As like the `FormData` component, this hook will provide all values of the current form.
```
import { useFormData } form '@4react/forms'

const MyCustomSubmit = ({ name }) => {
  const { values, valid } = useFormData()

  const submit = () => {
    if(valid) {
      sendData(values)
    }
  }

  return <button onClick={submit} />
}
```

Accepted parameters:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | - | ***Required***. The name of the field |
| options | object | - | An object containing all the other optional props of the `FormField` component. |

Provided parameters:

| Name | Type | Description |
| --- | --- | --- |
| values | object | Object containing all values of the form. |
| valid | boolean | Points if the values in all the fields are considered valid. Returns false if no validation is done yet.
| validate | Function | For performance reasons it's possible to force validation only on demand. In these cases invoking this function will validate the entire form. |
