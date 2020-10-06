import React from 'react'
import { classNameCreate } from './utils';
import { isEqual } from 'lodash';

class SelectInput extends React.PureComponent {
    /** Indicates the ProxyInput layer what value should be taken as default */
    static emptyValue = ''

    state = { options: [] }

    componentDidMount() {
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
        const { children, setValue, value } = this.props
        const { options, defaultValue } = this.props.ioProps
        
        if (!options) {
            const synOptions = []
            React.Children.forEach(children, element => {
                if (!React.isValidElement(element)) return
                const { value: extractedValue, children: label } = element.props
                synOptions.push({ value: extractedValue, label })
            })
            const v = value || defaultValue || (synOptions[0] ? synOptions[0].value : null)
            setValue(v)
            this.setState({ options: synOptions })
        } else {
            const v = value || defaultValue || (options[0] ? options[0].value : null)
            setValue(v)
            this.setState({ options })
        }
        
    }


    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, children, className = '', innerRef, ...rest } = this.props 
        const { options } = this.state
        return (
            <select
                data-message={message} className={`${classNameCreate(type, valid, invalid)} ${className}`.trim()}
                name={name}
                type={type}
                onChange={(e) => { console.log(e.target.value); setValue(e.target.value)}}
                ref={innerRef}
                value={value || ''}
                {...rest}
            >
                {options && options.map((option, index) => (
                    <option
                        key={option.value || index}
                        value={option.value || ''}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        )
    }
}

export default SelectInput
