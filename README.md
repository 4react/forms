# @4react / forms

Ready-to-use form context and validation for React Applications.

## Usage

### Import dependency

```
npm i @4react/forms
```

### Compose fields

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

[Live example](https://codesandbox.io/s/4reactformssample1-vlxbo?file=/src/App.js)

## API

### Form
Component that provides a context for a form.

```jsx
import { Form } from '@4react/forms'

const App = () => (
  <Form>
    ...
  </Form>
)
```

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| initialValues | object | - | ***optional*** - Initial values for the form fields. |

### FormField
Component that registers a new field for the surrounding form.

```jsx
import { FormField } from '@4react/forms'

...

<FormField name="email">
  {({ update, valid }) => (
    <input
      type="text"
      onChange={e => update(e.target.value)}
      style={{ borderColor: valid ? 'gray' : 'red' }}
    />
  )}
</FormField>
```

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | - | Name of the field |
| defaultValue | any | - | ***optional*** - Default value of the field. |
| accept | Function, RegExp | - | ***optional*** - If provided, this function is used to validate the value of the field. For string fields (and compatible types fields) a RegExp can be use also. |
| validateOn | "init", "update" | "update" | ***optional*** - Use to control which moments are take into consideration for validation. A list of values is also accepted. |

This components accept a child function, and provides to it an object with the following properties:

| Name | Type | Description |
| --- | --- | --- |
| update | Function | Required to update the value of the field. |
| valid | boolean | Points if last validation is passed or none is executed yet.
| value | any | The stored value of the field (for controlled inputs). |

### FormData
Component that retrieves all values of the current form.

```jsx
import { FormData } from '@4react/forms'

...
    
<FormData>
  {({ values, valid }) => (
    <button
      disabled={!valid}
      onClick={() => sendData(values)}
    >
      SEND DATA
    </button>
  )}
</FormData>
```

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| validate | boolean | true | ***optional*** - Used for performance issues, setting this property to false will disable automatic validation. Manual validation can be triggered by calling the `validate` method passed to children. |

This components accept a child function, and provides to it the following properties:

| Name | Type | Description |
| --- | --- | --- |
| values | object | Object containing all values of the form. |
| valid | boolean | Points if the values in all the fields are considered valid. Returns false if no validation is done yet.
| validate | Function | For performance reasons it's possible to force validation only on demand. In these cases invoking this function will validate the entire form. |

### Hooks
Alternatively to the use of the above components, it's possible to create custom fields and data consumers, using the following hooks:

#### useFormField
This hook will register a new field with the specified name, and returns the same set of properties of the `FormField` component (see [FormField](#formfield)). 

```jsx
import { useFormField } form '@4react/forms'

const MyCustomField = ({ name }) => {
  const { update, valid } = useFormField(name)

  return <input ... />
}
```

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | - | Name of the field. |
| options | object | {} | ***optional*** - Object accepting all optional props of the `FormField` component (see [FormField](#formfield)). |

### useFormData
This hook retrieves collected values of the current form, and returns the same set of properties of the `FormData` component (see [FormData](#formdata)).

```jsx
import { useFormData } from '@4react/forms'

const MyCustomSubmit = () => {
  const { values, valid } = useFormData()

  return <button ... />
}
```

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| options | object | {} | ***optional*** - Object accepting all optional props of the `FormData` component (see [FormData](#formdata)). |
