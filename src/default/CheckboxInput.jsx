import React from 'react'
import PropTypes from 'prop-types';
import { className } from './utils';

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

    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, ...rest } = this.props 
        return (
            <div data-message={message} className={className(type, valid, invalid)}>
                <input
                    name={name}
                    type={type}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    {...rest}
                />
            </div>
        )
    }
}

export default CheckboxInput
