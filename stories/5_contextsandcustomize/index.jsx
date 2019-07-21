import React from 'react';

import IOForm, { LayoutContext, ValidatorContext, withIO, IOInput } from '../../src';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import layouting from './LAYOUTING.md';
import validator from './VALIDATOR.md';
import custom from './CUSTOM_INPUT.md';

import 'bootstrap/dist/css/bootstrap.min.css';

const myvalidations = {
    'biggerthan1000': v => v > 1000,
    'nog': v => v ? v.indexOf('g') === -1 : true,
    'onlynumbers': '^[0-9]+$',
    'notother': v => v !== 'other'
} 

const mymessages = {
    'biggerthan1000': 'Your number must be bigger than 1000',
    'nog': 'Your value cannot contain a "g"',
    'onlynumbers': 'Only numbers allowed',
}

const RandomValueComponent = (props) => {
    const { ioProps: { invalid, valid, message }, value, setValue } = props
    
    return (
        <div>
            <label>Current value: {value}</label>
            <button type="button" onClick={() => setValue(Math.random()*100)}>
                Random Number
            </button>
            <span style={{ color: invalid ? 'red' : valid ? 'green' : 'black'  }}>{message}</span>
        </div>
    )
}
const RandomValue = withIO('random')(RandomValueComponent)

const stories = storiesOf('Context & Customizing', module);
stories.addDecorator(withKnobs) 


 
stories.add('Layouting', () => (
    <LayoutContext layouter="Bootstrap4">
        <IOForm formdata={boolean('FormData', false)} reset={boolean('Reset', false)} onSubmit={action('Submit')}>
            <IOForm.Input 
                inline={boolean('Inline: Username', true)}
                required
                invalidMessage="Username is required"
                label="Username"
                name="username"
                type="text"
                prepend="U"
            />
            <IOForm.Input 
                inline={(function(inline){ return inline ? { label: 'col-sm-2',input: 'col-sm-10' } : undefined })(boolean('Inline: Password', true))} 
                required
                invalidMessage="Password is required"
                label="Password"
                name="password"
                type="password"
                prepend="P"
            />
            <IOForm.Input
                inline={(function(inline){ return inline ? { input: 'col-sm-10' } : undefined })(boolean('Inline: Options', false))} 
                name="options"
                type="select">
                <opition value="1">1st Option</opition>
                <opition value="2">2nd Option</opition>
                <opition value="3">3rd Option</opition>
            </IOForm.Input>
            <IOForm.Input label="Names" inline={boolean('Inline: Names', false)} type="radio" name="names">
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
), {
  readme: {
    // override docs
    content: layouting,
    codeTheme: 'Xonokai'
  }
});

stories.add('Validator', () => (
    <ValidatorContext validations={myvalidations} messages={mymessages} defaultMessage={"Incorrect"} requiredMessage={"Field cannot be empty"}>
        <LayoutContext layouter="Bootstrap4">
            <IOForm reset={boolean('Reset', false)} onSubmit={action('Submit')}>
                <IOForm.Input required label="Year" name="year" type="number" validate="biggerthan1000" />
                <IOForm.Input required label="Names" name="names" type="text" validate="nog" />
                <IOForm.Input required label="Amount" name="amount" type="text" validate="onlynumbers" />
                <IOForm.Input required label="Not other" name="notother" type="select" validate="notother">
                    <option value="some">Some value</option>
                    <option value="other">Other value</option>
                </IOForm.Input>
                <div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </IOForm>
        </LayoutContext>
    </ValidatorContext>
), {
  readme: {
    // override docs
    content: validator,
    codeTheme: 'Xonokai'
  }
});

stories.add('Custom Input', () => (
    <IOForm onSubmit={action('Submit')}>
        <RandomValue
            name="random1"
            validate={v => v > 50}
            invalidMessage="Value must be higher than 50"
            validMessage="Your value is correct"
        />
        <IOInput type="random"
            name="random2"
            validate={v => v < 50}
            invalidMessage="Value must be less than 50"
            validMessage="Your value is correct"
        />
        <button type="submit">Send Random Value</button>
    </IOForm>
), {
  readme: {
    // override docs
    content: custom,
    codeTheme: 'Xonokai'
  }
});