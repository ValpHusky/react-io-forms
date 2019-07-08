## type: string

IOInputs have a prop called **type**. This prop works as the native HTML attribute type by indicating which type of input will be rendered. IOForms comes by default with the basic HTML5 types available but you can potencially add more custom inputs into the IOForm input registry (IORegistry) and access them by the **type** prop.

```js
<IOForm reset onSubmit={() => { action('Submit') }}>
    <IOForm.Input type="text" name="username" />
    <IOForm.Input type="password" name="password" />
    <IOForm.Input type="email" name="email" />

    <IOForm.Input type="checkbox" name="hasoptions" />

    <IOForm.Input type="select" name="options">
        <option value="1">1st Option</option>
        <option value="2">2nd Option</option>
        <option value="3">3rd Option</option>
    </IOForm.Input>

    <IOForm.Input type="radio" name="names">
        <option value="john">John</option>
        <option value="mark">Mark</option>
        <option value="carl">Carl</option>
    </IOForm.Input>
</IOForm>
```
The available options in the **default** IORegistry are:
- **Text based:** text, email, password, url, date, time, month, week 
- **Option based:** radio, select (*require option as children*)
- **Boolean based:** checkbox
- **Other:** range, hidden, file, image, color


To learn more about how to add new inputs to the IORegistry checkout the **IORegistry** section.

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->