## onValidity: (state: boolean) => void

IOForms have a callback prop called **onValidity**, this callback is invoked when the validity state changes. Validity state is achiveved when all fields have passed their validations (or have a non nil value when flaged as required) or when any of the fields has failed validation.

```js
<IOForm onSubmit={submit} onValidity={state => action(state)}>
    <IOForm.Input name="username" />
    <IOForm.Input type="password" name="password" />
    <Button disabled={bdisabled}>Submit</Button>
</IOForm>

```

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->