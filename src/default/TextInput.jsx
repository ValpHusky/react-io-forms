import React from 'react'
import PropTypes from 'prop-types';
import { classNameCreate } from './utils';

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

    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, className = '', innerRef, ...rest } = this.props
        return (
            <input
                data-message={message} className={`${classNameCreate(type, valid, invalid)} ${className}`.trim()}
                type={type}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                name={name}
                ref={innerRef}
                {...rest}
            />
        )
    }
}

export default TextInput
