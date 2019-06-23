import React from 'react'
import PropTypes from 'prop-types';
import { className } from './utils';

class TextInput extends React.PureComponent {
    static propTypes = {
        value: PropTypes.any,
        /** INJECTED FROM ProxyInput */
        ioProps: PropTypes.object.isRequired,
        /** INJECTED FROM ProxyInput */
        setValue: PropTypes.func
    }

    /** Indicates the ProxyInput layer what value should be taken as default */
    static emptyValue = ''

    state = {
        selected: null
    }

    constructor(props) {
        super(props)

        this.state = {
            selected: props.value
        }
    }

    componentDidMount() {
        const { value, setValue} = this.props
        const { selected } = this.state 
        setValue(selected ? value : null)

        this.extractOptions()
    }

    extractOptions() {
        const { children, options } = this.props.innerProps
        
        if (!options) {
            const synOptions = []
            React.Children.forEach(children, element => {
                if (!React.isValidElement(element)) return
              
                const { value, children: label } = element.props
                value && synOptions.push({ value, label })
            })
            this.setState({ options: synOptions })
        } else {
            this.setState({ options })
        }
        
    }

    onChange = (value) => {
        const { setValue } = this.props
        this.setState({ selected: value })
        setValue(value)
    }

    render() {
        const { ioProps: { type, valid, invalid, message }, setValue, value, children, ...rest } = this.props 
        const { options, checked } = this.state

        return (
            <div data-message={message} className={className(type, valid, invalid)}>
                <select
                    type={type}
                    onChange={(e) => setValue(e.target.value)}
                    {...rest}
                >
                    {options && options.map(option => (
                        <option
                            selected={option.value === checked ? 'selected' : undefined}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default TextInput
