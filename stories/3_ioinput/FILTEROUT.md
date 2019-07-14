## filterOut: Function<any>

IOInputs have a prop called **filterOut**. This prop indicates the IOInput to pass any outgoing value into any external source (**onValue prop** or **IOForm serialization**) through the given function before sending the returned value.

**Note:** Value set by the event **onChange** (manually set by the user) is not filtered by this Function.


#### Example

```jsx
<IOForm onSubmit={() => { action('Submit') }}>
    <IOForm.Input filterOut={v => v ? v.toLowerCase() : v} value="John" type="text" name="name" />
    <IOForm.Input filterOut={v => v ? v.toUpperCase() : v} value="McClain" type="text" name="lastname" />
</IOForm>
```

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->