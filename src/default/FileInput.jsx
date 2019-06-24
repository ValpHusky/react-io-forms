import React from 'react'
import PropTypes from 'prop-types';
import { className } from './utils';

class FileInput extends React.PureComponent {
    static propTypes = {
        value: PropTypes.any,
        /** INJECTED FROM ProxyInput */
        ioProps: PropTypes.object.isRequired,
        /** INJECTED FROM ProxyInput */
        setValue: PropTypes.func
    }

    /** Indicates the ProxyInput layer what value should be taken as default */
    static emptyValue = ''

    fileinput = null

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value && this.props.value === '') {
            this.fileinput.value = ''
        }
    }

    onChange = (e) => {
        const { setValue } = this.props
        const files = e.target.files

        if (files && files.length) {
            setValue(files.length === 1 ? files[0] : files)
        }
    }

    render() {
        const { ioProps: { type, valid, invalid, message, name }, setValue, value, ...rest } = this.props 
        return (
            <div data-message={message} className={className(type, valid, invalid)}>
                <input
                    name={name}
                    type={type}
                    innerRef={(e) => { this.fileinput = e }}
                    onChange={this.onChange}
                    {...rest}
                />
            </div>
        )
    }
}

export default FileInput
