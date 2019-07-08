import React from 'react';

import IOForm from '../../src';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import type from './TYPE.md'
import required from './REQUIRED.md'
import exclude from './EXCLUDE.md'
import include from './INCLUDE.md'
 
const stories = storiesOf('IOInput', module);
stories.addDecorator(withKnobs) 

 
stories.add('Type', () => (
  <IOForm formdata={boolean('FormData', false)} reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="input-group">
      <label for="username">Username</label>
      <IOForm.Input name="username" type="text" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input  name="password" type="password" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Options</label>
      <IOForm.Input  name="options" type="select">
          <opition value="1">1st Option</opition>
          <opition value="2">2nd Option</opition>
          <opition value="3">3rd Option</opition>
      </IOForm.Input>
    </div>
    <div className="input-group">
      <label htmlFor="name">Name</label>
      <IOForm.Input type="radio" name="name">
        <option value="john">John</option>
        <option value="mark">Mark</option>
        <option value="carl">Carl</option>
      </IOForm.Input>
    </div>
    
    <div>

      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: type,
    codeTheme: 'Xonokai'
  }
});


stories.add('Required', () => (
  <IOForm formdata={boolean('FormData', false)} reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="input-group">
      <label for="username">Username</label>
      <IOForm.Input required={boolean('Required(username)', true)} name="username" type="text" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input required={boolean('Required(password)', true)}  name="password" type="password" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: required,
    codeTheme: 'Xonokai'
  }
});


stories.add('Exclude', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="input-group">
      <label for="username">Username</label>
      <IOForm.Input exclude={boolean('Exclude(username)', false)} name="username" type="text" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input exclude={boolean('Exclude(password)', false)}  name="password" type="password" />
    </div>
    <div className="input-group">
      <label htmlFor="password">I accept the terms of service</label>
      <IOForm.Input required exclude={boolean('Exclude(terms)', true)}  name="terms" type="checkbox" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: exclude,
    codeTheme: 'Xonokai'
  }
});


stories.add('Include', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="input-group">
      <label for="username">Firstname</label>
      <IOForm.Input include={boolean('Include(firstname)', false)} name="firstname" type="text" />
    </div>
    <div className="input-group">
      <label htmlFor="password">Lastname</label>
      <IOForm.Input include={boolean('Include(lastname)', false)}  name="lastname" type="text" />
    </div>
    <div className="input-group">
      <label htmlFor="password">I own a car</label>
      <IOForm.Input include={boolean('Include(terms)', true)}  name="owncar" type="checkbox" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: include,
    codeTheme: 'Xonokai'
  }
});