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

    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, ...rest } = this.props
        return (
            <div data-message={message} className={className(type, valid, invalid)}>
                <input
                    type={type}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    name={name}
                    {...rest}
                />
            </div>
        )
    }
}

export default TextInput
