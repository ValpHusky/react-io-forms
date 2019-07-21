# ValidatorContext: React Context

IOForms comes with a way to create a global set of validations and messages to use across your app, to do this you have to use the **ValidatorContext**.

To setup it up, you need to import it from IOForms and add your validations and messages

```jsx
import IOForm { ValidatorContext } from 'react-io-forms'

const myvalidations = {
    'biggerthan1000': v => v > 1000,
    'nog': v => v ? v.indexOf('g') === -1 : true,
    'onlynumbers': '^[0-9]+$',
    'notother': v => v !== 'other'
} 

const mymessages = {
    'biggerthan1000': 'Your number must be bigger than 1000',
    'nog': 'Your value cannot contain a "g"',
    'onlynumbers': 'Only numbers allowed',
}

const App = () => (
    <ValidatorContext
        validations={myvalidations}
        messages={mymessages}
        defaultMessage={"Incorrect"}
        requiredMessage={"Field cannot be empty"}
    >
        <Form />
    </ValidatorContext>
)

const Form = () => (
    <IOForm onSubmit={v => doSomething(v)}>
        <IOForm.Input required name="year" type="number" validate="biggerthan1000" />
        <IOForm.Input required name="names" type="text" validate="nog" />
        <IOForm.Input required name="amount" type="text" validate="onlynumbers" />
        <IOForm.Input name="notother" type="select" validate="notother">
            <option value="some">Some value</option>
            <option value="other">Other value</option>
        </IOForm.Input>
    </IOForm>
)
```


#### Example


<!-- STORY -->

<!-- PROPS -->