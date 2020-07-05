import React from 'react'
import PropTypes from 'prop-types';
import { classNameCreate } from './utils';
import { isEqual } from 'lodash';

class SelectInput extends React.PureComponent {
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

    componentDidUpdate(prevProps) {
        const { children: prevChildren } = prevProps
        const { children } = this.props
        const { options: prevOptions } = prevProps.ioProps
        const { options } = this.props.ioProps

        if (!isEqual(options, prevOptions) || prevChildren !== children) {
            this.extractOptions()
        }
    }

    extractOptions() {
        const { children, setValue } = this.props
        const { options } = this.props.ioProps
        
        if (!options) {
            const synOptions = []
            React.Children.forEach(children, element => {
                if (!React.isValidElement(element)) return
              
                const { value, children: label } = element.props
                value && synOptions.push({ value, label })
            })
            synOptions[0] && setValue(synOptions[0].value)
            this.setState({ options: synOptions })
        } else {
            options[0] && setValue(options[0].value)
            this.setState({ options })
        }
        
    }

    onChange = (value) => {
        const { setValue } = this.props
        this.setState({ selected: value })
        setValue(value)
    }

    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, children, className = '', innerRef, ...rest } = this.props 
        const { options, checked } = this.state
        return (
            <select
                data-message={message} className={`${classNameCreate(type, valid, invalid)} ${className}`.trim()}
                name={name}
                type={type}
                onChange={(e) => setValue(e.target.value)}
                ref={innerRef}
                {...rest}
            >
                {options && options.map(option => (
                    <option
                        key={option.value}
                        selected={option.value === checked ? 'selected' : undefined}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        )
    }
}

export default SelectInput
