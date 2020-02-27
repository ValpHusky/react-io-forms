import React from 'react'
import PropTypes from 'prop-types';
import { classNameCreate } from './utils';

class CheckboxInput extends React.PureComponent {
    static propTypes = {
        value: PropTypes.any,
        /** INJECTED FROM ProxyInput */
        ioProps: PropTypes.object.isRequired,
        /** INJECTED FROM ProxyInput */
        setValue: PropTypes.func
    }

    /** Indicates the ProxyInput layer what value should be taken as empty */
    static emptyValue = false

    onChange(value) {
        this.props.setValue(value)
    }

    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, className = '', innerRef, ...rest } = this.props 
        return (
            <input
                ref={innerRef}
                data-message={message}
                className={`${classNameCreate(type, valid, invalid)} ${className}`.trim()}
                name={name}
                type={type}
                onChange={(e) => this.onChange(e.target.checked)}
                checked={value}
                {...rest}
            />
        )
    }
}

export default CheckboxInput
