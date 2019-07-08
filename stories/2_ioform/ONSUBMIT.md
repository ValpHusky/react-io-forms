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

#### Example

<!-- STORY -->

<!-- PROPS -->

