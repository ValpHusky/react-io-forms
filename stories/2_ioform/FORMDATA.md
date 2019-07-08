## formdata: boolean

IOForms have a boolean prop called **formdata**, this prop indiates IOForm to serialize the IOInput values as a **FormData** object instance instead of a plain object.

```js
<IOForm reset formdata onSubmit={() => { action('Submit') }}>
    <IOForm.Input name="username" />
    <IOForm.Input type="password" name="password" />
</IOForm>
```

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->