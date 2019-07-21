# LayoutContext: React Context

IOForms comes with a way to create a custom layout around a IOInput to be rendered, the way is through the Layouter. Layouter is a function that receives the **Component** to be rendered and it's **props** and is up to you how it will render.

To setup your **Layouter** you need to use the **LayoutContext** from IOForms, this will set your global layouter function to be used as render blueprint for all the IOInputs within the context.

```jsx
import { LayoutContext, IOInput } from 'react-io-forms'

const myLayouter = (Component, props) => {
    const { title, ...rest } = props 
    return (
        <div className="my-input">
            <span className="title">{title}</span>
            <Component {...rest} />
        </div>
    )
}

const MyInput = () => (
    <LayoutContext layouter={myLayouter}>
        <IOInput title="Set the username" name="username" type="text" />
        <IOInput title="Set the password" name="password" type="password" />
    </LayoutContext>
)
```

In this example (If you're using the **default IOInputs**) the output would be:

```html
<div class="my-input">
    <span class="title">Set the username</span>
    <input type="text" name="username" />
</div>
<div class="my-input">
    <span class="title">Set the password</span>
    <input type="password" name="password" />
</div>
```

## Built-in Layouters
IOForms comes with built-in layouter functions, they're built by us to deliver commonly used standard layouts and classes for inputs. IOForms currently has these built-in layouters:
- **Bootstrap4**
<!-- - **Material** -->

### Bootstrap4
Bootstrap4 layouter extends the IOInput set of props to these new extra props to control the **Bootstrap** related layout characteristics:

| Name    | Required | Type                                        | Default Value | Description                                                                     |
|---------|----------|---------------------------------------------|---------------|---------------------------------------------------------------------------------|
| inline  | -        | boolean \| { input: string, label: string } |               | Sets the input into inline mode                                                 |
| prepend | -        | string \| Array\<string\> \| ReactNode                         |               | Sets the element or elements to be rendered as addons at the left of the input  |
| append  | -        | string \| Array\<string\> \| ReactNode                         |               | Sets the element or elements to be rendered as addons at the right of the input |
| label   | -        | string                                      |               | Label text for the input                                                        |                                                      |

#### How to use
To use the built-in Bootrstrap4 you need to integrate the Bootstrap 4 CSS to your project independently (built-in layouter just creates Bootstrap4 Input/Form compliant HTML). There are different ways to do this, one is through **npm install**:

```bash
npm i bootstrap --save
```
Then add the css to your project. At your **index.jsx**:
```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```
Alternatively you can add the **SCSS** directly to your scss files. At your main **scss** file:
```css
@import '~bootstrap/scss/bootstrap.scss'
```

Then you need to implement **LayoutContext** and add **"Boostrap4"** string as your layouter:

```jsx
<LayoutContext layouter="Bootstrap4">
        <IOForm onSubmit={(values) => doSomething(values)}>
            <IOForm.Input 
                inline 
                required
                invalidMessage="Username is required"
                label="Username"
                name="username"
                type="text"
            />
            <IOForm.Input 
                inline={{ label: 'col-sm-2',input: 'col-sm-10' }} 
                required
                invalidMessage="Password is required"
                label="Password"
                name="password"
                type="password"
            />
            <IOForm.Input  name="options" type="select">
                <opition value="1">1st Option</opition>
                <opition value="2">2nd Option</opition>
                <opition value="3">3rd Option</opition>
            </IOForm.Input>
            <IOForm.Input label="Names"  type="radio" name="names">
                <option value="john">John</option>
                <option value="mark">Mark</option>
                <option value="carl">Carl</option>
            </IOForm.Input>
            <IOForm.Input label="I have read the terms" type="checkbox" name="terms" />
            <div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </IOForm>
    </LayoutContext>
```


#### Example


<!-- STORY -->

<!-- PROPS -->