## IOInputMessage: Component

IOForms comes with a way to put any IOInput message where suits you the best and in a React-friendly declarative way with the component **IOInputMessage**. Any message sent by the prop function **onMessage** can be channeled to this component.

**Note: This component can only be used inside a IOForm. It will not work with stand-alone IOInputs**


```jsx
import IOForm, { IOInputMessage } from 'react-io-forms'

<IOForm onSubmit={() => { action('Submit') }}>
    <IOForm.Input
        validate="email"
        validMessage="Valid Email"
        invalidMessage="Invalid Email"
        type="text"
        name="myemail"
    />
    <label>Message: <IOInputMessage for="myemail" /></label>
</IOForm>
```


<!-- STORY -->

<!-- PROPS -->