import React from 'react';

import IOForm, { IOInputMessage } from '../../src';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { IOInput, LayoutContext, InputError } from '../../src';
import { useState } from 'react';

const stories = storiesOf('Performance', module);
stories.addDecorator(withKnobs) 

stories.add('200 inputs with submit failure', () => (
    <LayoutContext layouter="Bootstrap4">
        <IOForm formdata={boolean('FormData', false)} reset={boolean('Reset', false)} onSubmit={((ac) => async (value) => {
            ac(value)
            throw new InputError('Failure', ['field_0'])
        })(action('Submit'))}>
            {(new Array(1000)).fill('a').map((e, i) => (
                <div key={i}>
                    <IOInput value={text('Default Value', 'Hello')} validate={v => v.length > 3} invalidMessage="mal" label={`Field ${i}`} name={`field_${i}`} />
                </div>
            ))}
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </IOForm>
    </LayoutContext>
  ));

const ConditionalInputForm = () => {
    const [ show, setShow ] = useState(false)
    return (
        <LayoutContext layouter="Bootstrap4">
            <IOForm formdata={boolean('FormData', false)} reset={boolean('Reset', false)} onSubmit={((ac) => async (value) => { ac(value) })(action('Submit'))}>
                <IOInput required label={`Name`} name={`name`} />
                <IOInput label={`Has lastname?`} onValue={(v) => setShow(v)} name={`_haslastname`} type="checkbox" />
                {show && <IOInput required label={`Lastname`} name={`lastname`} />}
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </IOForm>
        </LayoutContext>
    )
}

stories.add('Conditional Input', () => <ConditionalInputForm />);