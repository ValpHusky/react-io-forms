## defaultValue: any

IOInputs have a prop called **defaultValue**. This prop indicates the IOInput to initialize the value using the given default value. It also indicates IOForm that it should set this value back to the input once the **reset** process runs over the IOInput.

```js
<IOForm onSubmit={() => { action('Submit') }}>
    <IOForm.Input defaultValue="John" type="text" name="name" />
    <IOForm.Input defaultValue="McClain" type="text" name="lastname" />
</IOForm>
```

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->