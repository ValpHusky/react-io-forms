## validate: boolean | string | RegExp | Function

IOInputs have a prop called **validate**. This prop indicates the validation this IOInput must pass to be considered valid. The value can be:

1. A string indicating the name of an entry in the **ValidationContext**
2. A regular expression as a string.
3. A boolean indicating a hardcoded state for valid (true) or invalid (false).
4. A RegExp object
5. A Function that receives as parameter the value and must return a boolean state: for valid (true) or invalid (false).
**Note:** Optionally the Function validation can return an object with the properties **valid** and **message** this allows for specific validation and also message.

```jsx
<IOForm onSubmit={() => { action('Submit') }}>
    <IOForm.Input validate={v => ({ valid: isValidStreet(v), message: 'Street is not valid' })} type="text" name="street" />
</IOForm>
```

### Validation Context
IOForms has a the ability to establish a set of validations stored by a key name and as value the validation itself. This validation can be any of the specified types. By default IOForms exposes a set of validations for you to use. If you create your own validation context you can add new validations or override the existing ones by setting the same **validation name**.

The default available validations are:
```jsx
validations = {
  letters: /^[a-zA-Z\s]+$/,
  numbers: /^[0-9]+$/,
  numeric: /^[0-9\.,]+$/,
  email:   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
}
```

**NOTE:** For more information on how to create a custom **ValidationContext** checkout the **IOContext** section.



#### Example


```jsx
<IOForm onSubmit={() => { action('Submit') }}>
    <IOForm.Input validate="letters" type="text" name="name" />
    <IOForm.Input validate={v => v === 'McClain'} type="text" name="lastname" />
</IOForm>
```

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->