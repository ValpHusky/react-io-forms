import TextInput from  './TextInput'
import FileInput from './FileInput'
import CheckboxInput from './CheckboxInput'
import RadioInput from './RadioInput'
import SelectInput from './SelectInput'
import TextAreaInput from './TextAreaInput'


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

export default entry