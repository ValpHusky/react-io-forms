import React from 'react';

import IOForm from '../../src/';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import readme from './GETTING_STARTED.md'
import { action } from '@storybook/addon-actions';
 
const stories = storiesOf('Getting Started', module);
stories.addDecorator(withKnobs) 
.addParameters({
    readme: {
      // Show readme before story
      content: readme,
      codeTheme: 'Xonokai'
    },
})
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
// stories.addDecorator(withInfo({ inline: false }))
 
// Knobs for React props
stories.add('Install & Usage', () => (
  <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
    <div>
      <label for="username">Username</label>
      <IOForm.Input id="username" name="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <IOForm.Input id="password" name="password" type="password" />
    </div>
  </IOForm>
));