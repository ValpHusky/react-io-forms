import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { classNameCreate } from './utils';

class RadioInput extends React.PureComponent {
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
        checked: null
    }

    constructor(props) {
        super(props)

        this.state = {
            checked: props.value
        }
    }

    componentDidMount() {
        const { value, setValue} = this.props
        const { checked } = this.state 
        setValue(checked ? value : null)

        this.extractOptions()
    }

    extractOptions() {
        const { children, options } = this.props
        
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
        this.setState({ checked: value })
        setValue(value)
    }

    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, children, className = '', ...rest } = this.props
        const { options, checked } = this.state
        
        return (
            <Fragment>
                {options && options.map(option => (
                    <div data-message={message} className={`${classNameCreate(type, valid, invalid)} ${className}`.trim()}>
                        <input
                            id={`radio_${name}_${option.value.toString()}`}
                            type="radio"
                            value={option.value}
                            onChange={e => this.onChange(option.value)}
                            checked={option.value === checked}
                            {...rest}
                        />
                        <label className="iof-radio-label" htmlFor={`radio_${name}_${option.value.toString()}`}>{option.label}</label>
                    </div>
                ))}
            </Fragment>
        )
    }
}

export default RadioInput
