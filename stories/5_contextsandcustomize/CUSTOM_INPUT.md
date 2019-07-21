# Custom Input: How to

IOForms allows for you to create your own custom IOInput. The way to do this is with the **HOC** wrapper **withIO**.

To use withIO you need to provide first two important arguments:
- **type**: This is the type which will be used within the registry of inputs.
- **registry (optional)**: Registry to use to register your new IOInput component.


```jsx
import { withIO } from 'react-io-forms'

const RandomValue = (props) => {
    const { ioProps: { invalid, valid, message }, value, setValue } = props
    
    return (
        <div>
            <label>Current value: {value}</label>
            <button type="button" onClick={() => setValue(Math.random()*100)}>
                Random Number
            </button>
            <span style={{ color: invalid ? 'red' : valid ? 'green' : 'black'  }}>{message}</span>
        </div>
    )
}

export default withIO('random')(RandomValue)
```
Once your component is wrapped by the IO **HOC** your component will have access to all the IOInput props. The **IOInput particular props** plus the current state for validity (**valid** and **invalid** and the current generated **message**, will be all concentrated into a prop called **ioProps** the rest of the props will be available directly from your props.

From this point you could either import your component and use directly in any IOForm or by its type once it has been imported once (when imported, your component gets registred).

```jsx
import IOForm, { IOInput } from 'react-io-forms'
import RandomValue from './RandomValue'

const App = () => (
    <IOForm onSubmit={values => doSomething(values)}>
        <RandomValue
            name="random1"
            validate={v => v > 50}
            invalidMessage="Value must be higher than 50"
            validMessage="Your value is correct"
        />
        <IOInput type="random"
            name="random2"
            validate={v => v < 50}
            invalidMessage="Value must be less than 50"
            validMessage="Your value is correct"
        />
        <button type="submit">Send Random Value</button>
    </IOForm>
)
```

#### Example


<!-- STORY -->

<!-- PROPS -->