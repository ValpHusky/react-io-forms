import React, { Fragment } from 'react';

import IOForm, { IOInputMessage, InputError } from '../../src';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ioinputmessages from './IOINPUT_MESSAGES.md'
import inputerror from './INPUT_ERROR.md'

const cannotStartWith = (letter) => (value) => {
    if (value) {
        if (value.substring(0,1) === letter) {
            throw new InputError(`Name cannot start with ${letter}`)
        }
    }
    return true
}

const validateCredentials = (ru, rp) => async (credentials) => {
    if (!credentials.username) {
        throw new InputError('Missing username', 'username')
    }
    else if (!credentials.password) {
        throw new InputError('Missing password', 'password')
    }
    else if (credentials.username !== ru && credentials.password !== rp) {
        throw new InputError('Incorrect credentials')
    }
    return true
}

const stories = storiesOf('Error Handling', module);
stories.addDecorator(withKnobs)



stories.add('IOInputMessage', () => (
    <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
      <div className="iof-group">
        <label for="username">My Email</label>
        <IOForm.Input
            validate="email" onMessage={action('Message')}
            invalidMessage={text('Invalid Message', 'Invalid Email')}
            validMessage={text('Valid Message', 'Valid Email')}
            type="text" name="myemail"
        />
        <label className="messages">Message: <IOInputMessage for="myemail" /></label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </IOForm>
  ), {
    readme: {
      // override docs
      content: ioinputmessages,
      codeTheme: 'Xonokai'
    }
});


stories.add('InputError', () => (
    <Fragment>
        <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
            <div className="iof-group">
                <label for="username">A name that cannot start with:</label>
                <IOForm.Input
                    validate={cannotStartWith(text('Cannot start with', 'A'))}
                    type="text"
                    name="name"
                />
                <label className="messages">Message: <IOInputMessage for="name" /></label>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </IOForm>
        <IOForm reset={boolean('Reset', false)} onSubmit={validateCredentials(text('Required Username', 'admin'),text('Required Password', '1234'))}>
            <div className="iof-group">
                <label for="username">Username</label>
                <IOForm.Input type="text" name="username" />
                <label className="messages">Message: <IOInputMessage for="username" /></label>
            </div>
            <div className="iof-group">
                <label for="password">Password</label>
                <IOForm.Input type="password" name="password" />
                <label className="messages">Message: <IOInputMessage for="password" /></label>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </IOForm>
    </Fragment>
    
  ), {
    readme: {
      // override docs
      content: inputerror,
      codeTheme: 'Xonokai'
    }
});

