## link: string | Array\<string\>

IOInputs have a prop called **link**. This prop indicates the IOForm that this particular IOInput will propagate its value (*when valid*) to the IOInputs in the same IOForm context indicated by the name or array of names.

```jsx
const createNickname = (value) => {
  if (value) {
      const random = Math.round(Math.random()*100)
      const cleaned = value.replace(/[^a-zA-Z0-9\-\._]/g, '_')
      return `${cleaned}${random}`
  }
  return value
}

const createEmail = (value) => {
  if (value) {
      const emailify = value.replace(/[^a-zA-Z0-9\-\._]/g, '_')
      return `${emailify.toLowerCase()}@company.com`
  }
  return value
}
const example = () => (
    <IOForm onSubmit={() => { action('Submit') }}>
        <IOForm.Input type="text" name="name" link={["suggest_nickname", "suggest_email"]} />
        <IOForm.Input type="text" name="suggest_nickname" filterIn={createNickname} />
        <IOForm.Input type="text" name="suggest_email" filterIn={createEmail} />

        <IOForm.Input include type="checkbox" name="ownscar" />
    </IOForm>
)
```

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section.

<!-- STORY -->

<!-- PROPS -->