## required: boolean

IOInputs have a prop called **required**. This prop indicates the IOInput that a non-empty value validation must be passed in order to achieve input validity. By default a value is considered as empty if is equal to **undefined**, **null** or **empty string**.

```js
<IOForm reset onSubmit={() => { action('Submit') }}>
    <IOForm.Input required type="text" name="email" />
    <IOForm.Input required type="password" name="password" />
</IOForm>
```

To learn more about IOInput validations checkout the prop section **validation**.

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->