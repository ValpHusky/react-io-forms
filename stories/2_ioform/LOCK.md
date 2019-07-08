## lock: boolean

IOForms have a boolean prop called **lock**, this prop locks the form out of subsequent *submit* or *reset* requests, this is very usefull if you want to prevent multiple submits due to user interaction. If your **onSubmit** callback returns a *Promise* (or async Function) the IOForm will automatically **lock** itself until the Promise is either *solved* or *rejected*.

```js
<IOForm reset onSubmit={() => { action('Submit') }}>
    <IOForm.Input name="username" />
    <IOForm.Input type="password" name="password" />
</IOForm>
```

To learn more about how the Promise *reject* or *solved* states affect the IOForm check out the section **InputError**.

#### Example

Use the right panel to access **Knobs** and interact with the form. Interactions will be logged into the **Actions** section. In this example the form locks itself automatically for 3 seconds (the time it takes for the promise to solve).

<!-- STORY -->

<!-- PROPS -->