import React from 'react'
import PropTypes from 'prop-types';
import { classNameCreate } from './utils';

class TextAreaInput extends React.PureComponent {
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
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, className = '', ...rest } = this.props 
        return (
            <textarea
                data-message={message} className={`${classNameCreate(type, valid, invalid)} ${className}`.trim()}
                name={name}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                {...rest}
            />
        )
    }
}

export default TextAreaInput
