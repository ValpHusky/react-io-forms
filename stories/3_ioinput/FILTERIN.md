## filterIn: Function<any>

IOInputs have a prop called **filterIn**. This prop indicates the IOInput to pass any incoming value from any external source (**value prop** or **linked field**) through the given function before setting the returned value into the input.

**Note:** Value set by the event **onChange** (manually set by the user) is not filtered by this Function.


#### Example

```jsx
<IOForm onSubmit={() => { action('Submit') }}>
    <IOForm.Input filterIn={v => v ? v.toLowerCase() : v} value="John" type="text" name="name" />
    <IOForm.Input filterIn={v => v ? v.toUpperCase() : v} value="McClain" type="text" name="lastname" />
</IOForm>
```

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->