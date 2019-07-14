# react-io-forms
Simple, functional, scalable input &amp; forms for React.js

### Install React IOForms and add to your project

1. Use npm install or yarn.
```bash
npm i react-io-forms --save
```
```bash
yarn add react-io-forms
```

2. Import to your project
```js
import IOForm from 'react-io-forms'
```

### How to use
IO Forms is based on the idea of simplifing how forms and inputs are declared and used in a React project. The most basic use is the recollection of data hold in simple input fields, for that a IOForm component must be imported and declared. Any child of type IOInput (also IOForm.Input) will be automatically handled by the IOForm logic.

```js
import React from 'react'
import IOForm from 'react-io-forms'

const MyComponent = (props) => (
    <IOForm onSubmit={doSomething}>
        <IOForm.Input type="text" name="username" />
        <IOForm.Input type="password" name="password" />
    </IOForm>
)

export default MyComponent
```

Alternatively you can import directly the IOInput component or import your custom IOInput from your own code or library.

```js
import React from 'react'
import IOForm, { IOInput } from 'react-io-forms'
import CustomInput from './'

const MyComponent = (props) => (
    <IOForm onSubmit={doSomething}>
        <IOInput type="text" name="username" />
        <IOInput type="password" name="password" />
        <CustomInput name="mydata" />
    </IOForm>
)

export default MyComponent
```


The callback given at **onSubmit** will receive as props a plain object holding each of the IOInput's values in keys defined by the prop **name**. Empty values are not serialized unless **include** IOInput prop is **true**.

```js
{ 'name': '<some value>', 'password': '<some value>', 'mydata': '<some value>' }
```

**Note: For full documentation checkout (IOForm's Storybook)[https://valphusky.github.io/react-io-forms]**

## IOForm
IOForm is the core component of the library, it handles the logic of serialization of any IOInput inside its tree (no matter the depth thanks to React Context API). These are the available props.

## onSubmit: Function

IOForms have a callback function prop called onSubmit. The serialized data taken from all the children IOInput is passed as argument to the given function. If there's any IOInput that does not meed its required **validations** the submit process will never be called.

Certain processes within IOForms are dependent of how this callback function behavies, the possible states could be either *successful* or *failed* submit.

#### Function: object|string|array|number
When the callback is of return type **any** non *boolean* or *Promise*, the submit is considered **successfull submit**  by default. Only if an exception is **thrown** by the function when this case is considered **failed submit**
```js
// Successfull submit
<IOForm onSubmit={(values) => { doSomething() }} />
// Failed submit
<IOForm onSubmit={(values) => { throw new Error() }} />
```

#### Function: boolean
When the callback is of return type **boolean**, the submit is considered **successfull submit**  when the return value is **true** and **failed submit** when the return value is **false**.
```js
// Successfull submit
<IOForm onSubmit={(values) => { return true }} />
// Failed submit
<IOForm onSubmit={(values) => { return false }} />
```

#### Function: Promise(any)
When the callback is of return type **Promise**, the submit is considered **successfull submit**  when the returned promise is **solved** and **failed submit** when the promise is **rejected**
```js
// Successfull submits
<IOForm onSubmit={(values) => { return Promise.solve() }} />
<IOForm onSubmit={async (values) => { doSomething() }} />

// Failed submits
<IOForm onSubmit={(values) => { return Promise.reject() }} />
<IOForm onSubmit={async (values) => { throw new Error() }} />
```

