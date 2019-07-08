## reset: boolean

IOForms have a boolean prop called **reset**. When reset is **false** or undefined the form will keep its values after a **successful submit**, when **true** the form will reset all it's IOInput fields back to the **defaultValue** when the onSubmit callback behaves as a successfull submit. If no defaultValue is defined within the IOInput, the **emptyValue** will be set, which is an empty string by default (If your IOInput is a custom component you can set the emptyValue with a static property. Check out the section **Custom IOInputs** to learn more).

```js
<IOForm reset onSubmit={() => { action('Submit') }}>
    <IOForm.Input name="username" />
    <IOForm.Input type="password" name="password" />
</IOForm>
```

To learn more about how to trigger **successfull submits** check out the *onSubmit* prop.

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->