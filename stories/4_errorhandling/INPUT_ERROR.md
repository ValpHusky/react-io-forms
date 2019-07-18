## InputError: Class

IOInput validation errors are thrown using instances of a class called **InputError**. Internally IOForms uses this class to handle unmatched validations but you can potentially use this class to create your own errors and indicate manually to IOForms where an error has occurred.

To Achieve this you may **throw** a new instance of the **InputError** class inside these function callbacks:

**For IOInput**
- validate (Function)
- onMessage
- onValue
- onChange

**For IOForm**
- onSubmit

### If thrown at IOInput props
You only need to set the message you want to deliver. The parameter **name** will be ignored.

```jsx
import IOForm, { IOInputMessage, InputError } from 'react-io-forms'

const cannotStartWith = (letter) => (value) => {
    if (value) {
        if (value.substring(0,1) === letter) {
            throw new InputError(`Name cannot start with ${letter}`)
        }
    }
    return true
}

<IOForm onSubmit={() => { action('submit') }}>
    <IOForm.Input
        validate={cannotStartWith('A')}
        type="text"
        name="name"
    />
    <label>Message: <IOInputMessage for="name" /></label>
</IOForm>
```

### If thrown at IOForm props
You need to set the message and specify which IOInput needs to be pointed as the error originator. If the **names** argument is not set, the message will propagate to **all** IOInputs in the form.

```jsx
import IOForm, { IOInputMessage, InputError } from 'react-io-forms'

const validateCredentials = async (credentials) => {
    if (!credentials.username) {
        throw new InputError('Missing username', 'username')
    }
    else if (!credentials.password) {
        throw new InputError('Missing password', 'password')
    }
    else if (credentials.username !== 'admin' && credentials.password !== '1234') {
        throw new InputError('Incorrect credentials')
    }
    return true
}

<IOForm onSubmit={validateCredentials}>
    <IOForm.Input type="text" name="username" />
    <label>Message: <IOInputMessage for="username" /></label>
    <IOForm.Input type="password" name="password" />
    <label>Message: <IOInputMessage for="password" /></label>
</IOForm>
```


<!-- STORY -->

### Class Definition

```ts

class InputError {
    /**
     * Shortcut static method
     * @throws {InputError}
     * */
    static throw(message: string, names?: string | Array<string>): InputError;

    /**
     * Class Constructor
     * @param {string} message The message to display.
     * @param {string | Array<string>} [names] The IOInput names to target
     * @param {Object} [data] This data object carries information regarding the IOInput.
     */
    constructor(message: string, names?: string | Array<string>, data?: Object );

    /** 
     * Returns the array of IOInput names for this InputError 
     * */
    names(): Array<string>
    /** 
     * Returns the first name of IOInput names for this InputError 
     * */
    name(): string
    /** 
     * Returns if the InputError list of names includes the given IOInput name
     * */
    includes(field: string): boolean
    /** 
     * Returns the message for this InputError 
     * */
    message(): string
    /** 
     * Returns the array of IOInput names for this InputError 
     * @override
     * */
    toString(): string
}

```