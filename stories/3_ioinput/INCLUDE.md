## include: boolean

IOInputs have a prop called **include**. This prop indicates the IOForm that it should serialize the input even if its value is equal to the **emptyValue** (by default **undefined**, **null** or **empty string**. Special case is **false** for type *checkbox*).

```js
<IOForm onSubmit={() => { action('Submit') }}>
    <IOForm.Input type="text" name="name" />
    <IOForm.Input type="text" name="lastname" />
    <IOForm.Input include type="checkbox" name="ownscar" />
</IOForm>
```

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->