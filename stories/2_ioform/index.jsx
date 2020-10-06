import React, { useState } from 'react';

import IOForm from '../../src/';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import reset from './RESET.md';
import onsubmit from './ONSUBMIT.md';
import lock from './LOCK.md';
import formdata from './FORMDATA.md';
import onvalidity from './ONVALIDITY.md';
import { sleep } from '../../src/default/utils';
 
const stories = storiesOf('IOForm', module);
stories.addDecorator(withKnobs) 

stories.add('onSubmit', () => (
  <div>
    <IOForm reset onSubmit={(values) => { action('Submit')(values) }}>
      <h4>With a simple callback function</h4>
      <div className="iof-group">
        <label htmlFor="username">Username</label>
        <IOForm.Input id="username" name="username" />
      </div>
      <div className="iof-group">
        <label htmlFor="password">Password</label>
        <IOForm.Input  name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </IOForm>
    <IOForm reset onSubmit={async (values) => {
        action('Submit promise on process: waiting 3 seconds')()
        action('3...')();
        await sleep(1000);
        action('2..')();
        await sleep(1000);
        action('1.')();
        await sleep(1000);
        action('Submit')(values)
        return
    }}>
      <h4>With an async (Promise returning) callback function</h4>
      <div>
        <label htmlFor="username">Username</label>
        <IOForm.Input id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <IOForm.Input  name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </IOForm>
  </div>
), {
  readme: {
    // override docs
    content: onsubmit,
    codeTheme: 'Xonokai'
  }
});
 
// Knobs for React props
stories.add('Reset', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label htmlFor="username">Username</label>
      <IOForm.Input id="username" name="username" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input  name="password" type="password" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: reset,
    codeTheme: 'Xonokai'
  }
});

// Knobs for React props
stories.add('Lock', () => (
  <IOForm lock={boolean('Lock', false)} reset={boolean('Reset', false)} onSubmit={async (values) => {
    action('Submit promise on process: waiting 3 seconds')()
    action('3...')();
    await sleep(1000);
    action('2..')();
    await sleep(1000);
    action('1.')();
    await sleep(1000);
    action('Submit')(values)
    return
  }}>
    <div className="iof-group">
      <label htmlFor="username">Username</label>
      <IOForm.Input id="username" name="username" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input  name="password" type="password" />
    </div>
    <div>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: lock,
    codeTheme: 'Xonokai'
  }
});


// Knobs for React props
stories.add('FormData', () => (
  <IOForm formdata={boolean('FormData', true)} reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label htmlFor="username">Username</label>
      <IOForm.Input id="username" name="username" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input  name="password" type="password" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: formdata,
    codeTheme: 'Xonokai'
  }
});

// Knobs for React props
stories.add('onValidity', () => {
  return (
    <React.Fragment>
      <IOForm onValidity={action('Validity')} reset={boolean('Reset', false)} onSubmit={action('Submit')}>
        <div className="iof-group">
          <label htmlFor="username">Username</label>
          <IOForm.Input required validate={(l => v => v.length > l)(number('Username minimum Length', 8))} id="username" name="username" />
        </div>
        <div className="iof-group">
          <label htmlFor="password">Password</label>
          <IOForm.Input required validate={(l => v => v.length > l)(number('Password Minimum Length', 8))} name="password" type="password" />
        </div>
        <div className="iof-group">
          <label htmlFor="displayname">Display Name</label>
          <IOForm.Input defaultValue={text('Display Name','John')} validate={(l => v => v.length > l)(number('Display Name minimum length', 3))} name="displayname" type="text" />
        </div>
        <div className="iof-group">
          <label htmlFor="mightBeRequired">Might be required</label>
          <IOForm.Input defaultValue="" required={boolean('Mark as required', false)} name="mightBeRequired" type="text" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </IOForm>
    </React.Fragment>
  )
}, {
  readme: {
    // override docs
    content: onvalidity,
    codeTheme: 'Xonokai'
  }
});

