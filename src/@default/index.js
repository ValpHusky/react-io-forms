import InputFactory from '../core/InputFactory'
import TextInput from  './TextInput'
import RangeInput from './RangeInput'


/** Entries of Inputs available for the default input registry */
const entry = [
    { type: [
        'default','text','number','email','password',
        'button','date', 'datetime-local', 'month', 'time',
        'url','week','hidden','range'
        ], 
        component: TextInput 
    },
    { type: ['file'], component: FileInput },
    { type: ['checkbox'], component: CheckboxInput },
    { type: ['radio'], component: RadioInput },
    { type: ['select'], component: SelectInput },
    { type: ['textarea'], component: TextAreaInput }
]

InputFactory.register('default', entry)

export default entry