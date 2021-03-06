import React from 'react';

import IOForm, { IOInputMessage } from '../../src';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import type from './TYPE.md'
import required from './REQUIRED.md'
import exclude from './EXCLUDE.md'
import include from './INCLUDE.md'
import defaultValue from './DEFAULTVALUE.md'
import validate from './VALIDATE.md'
import filterin from './FILTERIN.md'
import filterout from './FILTEROUT.md'
import link from './LINK.md'

const createNickname = (value) => {
  if (value) {
      const random = Math.round(Math.random()*100)
      const cleaned = value.replace(/[^a-zA-Z0-9\-\._]/g, '_')
      return `${cleaned}${random}`
  }
  return value
}

const createEmail = (value) => {
  if (value) {
      const emailify = value.replace(/[^a-zA-Z0-9\-\._]/g, '_')
      return `${emailify.toLowerCase()}@company.com`
  }
  return value
}
 
const stories = storiesOf('IOInput', module);
stories.addDecorator(withKnobs) 

 
stories.add('Type', () => (
  <IOForm formdata={boolean('FormData', false)} reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label for="username">Username</label>
      <IOForm.Input name="username" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input  name="password" type="password" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Options</label>
      <IOForm.Input required name="options" type="select" onInvalid={() => console.log('Invalid')}>
          <option>Select one</option>
          <opition value="1">1st Option</opition>
          <opition value="2">2nd Option</opition>
          <opition value="3">3rd Option</opition>
      </IOForm.Input>
    </div>
    <div className="iof-group">
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
    <div className="iof-group">
      <label for="username">Username</label>
      <IOForm.Input required={boolean('Required(username)', true)} name="username" type="text" />
    </div>
    <div className="iof-group">
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
    <div className="iof-group">
      <label for="username">Username</label>
      <IOForm.Input exclude={boolean('Exclude(username)', false)} name="username" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Password</label>
      <IOForm.Input exclude={boolean('Exclude(password)', false)}  name="password" type="password" />
    </div>
    <div className="iof-group">
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
    <div className="iof-group">
      <label for="username">Firstname</label>
      <IOForm.Input include={boolean('Include(firstname)', false)} name="firstname" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Lastname</label>
      <IOForm.Input include={boolean('Include(lastname)', false)}  name="lastname" type="text" />
    </div>
    <div className="iof-group">
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


stories.add('Default Value', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label for="username">Firstname</label>
      <IOForm.Input defaultValue={text('Firstname: Default Value', 'John')} name="firstname" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="password">Lastname</label>
      <IOForm.Input defaultValue={text('Lastname: Default Value', 'McClain')} name="lastname" type="text" />
    </div>
    <div>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: defaultValue,
    codeTheme: 'Xonokai'
  }
});

stories.add('Validate', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label for="username">Firstname</label>
      <IOForm.Input validate={text('firstname', 'letters')} name="firstname" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="lastname">Lastname</label>
      <IOForm.Input validate={(function(c) { return v => v === c })(text('lastname<Function>', 'McClain'))} name="lastname" type="text" />
    </div>
    <div>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: validate,
    codeTheme: 'Xonokai'
  }
});

stories.add('Filter In', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label for="username">Firstname</label>
      <IOForm.Input filterIn={v => v ? v.toLowerCase() : v} value={text('Firstname', 'John')} name="firstname" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="lastname">Lastname</label>
      <IOForm.Input filterIn={v => v ? v.toUpperCase() : v} value={text('Lastname', 'McClain')} name="lastname" type="text" />
    </div>
    <div>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: filterin,
    codeTheme: 'Xonokai'
  }
});

stories.add('Filter Out', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label for="username">Firstname</label>
      <IOForm.Input filterOut={v => v ? v.toLowerCase() : v} onValue={action('Firstname')} name="firstname" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="lastname">Lastname</label>
      <IOForm.Input filterOut={v => v ? v.toUpperCase() : v} onValue={action('Lastname')} name="lastname" type="text" />
    </div>
    <div>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: filterout,
    codeTheme: 'Xonokai'
  }
});

stories.add('Link', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div className="iof-group">
      <label for="username">Firstname</label>
      <IOForm.Input link={["suggest_nickname", "suggest_email"]} name="name" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="suggest_nickname">Suggested Nickname</label>
      <IOForm.Input filterIn={createNickname} name="suggest_nickname" type="text" />
    </div>
    <div className="iof-group">
      <label htmlFor="suggest_email">Suggested Email</label>
      <IOForm.Input filterIn={createEmail} name="suggest_email" type="text" />
    </div>
    <div>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </div>
  </IOForm>
), {
  readme: {
    // override docs
    content: link,
    codeTheme: 'Xonokai'
  }
});