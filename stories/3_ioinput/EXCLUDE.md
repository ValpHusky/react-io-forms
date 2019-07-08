## exclude: boolean

IOInputs have a prop called **exclude**. This prop indicates the IOForm that it should to serialize this IOInput. All the other interactions between IOInputs and IOForm still apply (like reset or linking).

```js
<IOForm reset onSubmit={() => { action('Submit') }}>
    <IOForm.Input type="text" name="email" />
    <IOForm.Input type="password" name="password" />
    <IOForm.Input required exclude type="checkbox" name="terms" />
</IOForm>
```

To learn more about other IOInput interactions like linking checkout the section **IOInput linking**

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->