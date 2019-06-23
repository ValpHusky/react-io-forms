import * as React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types';

import { IOInputCollectorContext } from './providers/Form'
import { IOInputValidatorContext } from './providers/Validator'
import { IOInputMessageContext } from './providers/Message'
import { IOInputRegistryContext } from './providers/Registry'
import { IOInputLinkageContext } from './providers/Linkage'
import { include, exclude } from './utils'

import ProxyInput from './core/ProxyInput'
import './@default'

export * from './providers/Form'
export * from './providers/Validator'
export * from './providers/Message'
export * from './providers/Registry'
export * from './core/InputError'
export * from './utils'


/** This React Component Wraps the logic of the regular input fields to add validations and other controls through simple declarative components */
const IOInput = ({ children, ...props}) => (
    <IOInputCollectorContext.Consumer>
        {form =>
            <IOInputValidatorContext.Consumer>
                {validation =>
                    <IOInputMessageContext.Consumer>
                        { messages =>
                            <IOInputRegistryContext.Consumer>
                            { registry =>
                                <IOInputLinkageContext.Consumer>
                                {linkage =>
                                    <ProxyInput 
                                        contextProps={{ form, validation, messages, registry, linkage}}
                                        ioProps={include(props, IOInput.propTypes)}
                                        standardProps={exclude(props, IOInput.propTypes)}
                                    >
                                        {children}
                                    </ProxyInput>
                                }
                                </IOInputLinkageContext.Consumer>
                            }
                            </IOInputRegistryContext.Consumer>
                        }
                    </IOInputMessageContext.Consumer>
                }
            </IOInputValidatorContext.Consumer>
        }
    </IOInputCollectorContext.Consumer>
)

IOInput.propTypes = {
    /** 
     * Sets the default value of the IOInput. This value will be set when the reset process triggers.
     * If this value is a Function this function will be executed and the return value will be set as default value.
     * */
    defaultValue: PropTypes.oneOfType([ PropTypes.any, PropTypes.func ]),
    /** Sets the value into the input */
    value: PropTypes.any,
    /** Type of Input to be rendered */
    type: PropTypes.string,
    /** Name of the input. This information is required and it is used as a reference for all the async processes like message propagation and data collection through IOInputForm */
    name: PropTypes.string.isRequired,
    /** Indicates this input must not be serialized during the value recollection performed by the IOForm Context */
    exclude: PropTypes.bool,
    /**
     * Indicates this input must be included into the serialization even if the input has the "empty value" set at that moment
     * NOTE: This prop cannot coexist with "required" or "exclude" (it would be ignored).
     * */
    include: PropTypes.bool,
    /** 
    * This value can be either an array or a string (same as a single element array). The string(s) represent a key from the validation object given by the ValidatorContext or a regular expression to test the value against.
    * Optionally the regular expresion can be given as it is (RegExp object).
    * If an array is given, the validations will be runned one after another in the given orther. For the input to be valid all validations must pass.
    * If a function is give, the validation will consist on running the value agains the function. The given function must return either true or false to indicate the validation passed
    * If a boolean is given, the validation will automatically resolve on the boolean's value. This is useful if you want to have full control over the invalid/valid state
    */
    validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.func]),
    /** A flag that indicates the value must not be null or empty to be a valid input */
    required: PropTypes.bool,
    /** This flag forces the state/className for a valid input (Normally this happens internally when the value meets the validation criteria) */
    valid: PropTypes.bool,
    /** This flag forces the state/className for an invalid input (Normally this happens internally when the value does NOT meet the validation criteria) */
    invalid: PropTypes.bool,
    /** This string forces a message into the message propagation channel. If present it will override any internally generated message */
    message: PropTypes.string,
    /** This function is called when an input changes its value and the value passes all the necessary validations */
    onValue: PropTypes.func,
    /** This function is called when an input changes its value for any value */
    onChange: PropTypes.func,
    /** This function is called when the input processes generate a new message. The function receives as arguments the "message" itself and the "field" which is the name given at the "name" prop */
    onMessage: PropTypes.func,
    /** This function is called when the input fails a validation. The function is called with the message and the field name as arguments */
    onInvalid: PropTypes.func,
    /** Message to send when the input value resolves in "invalid" */
    invalidMessage: PropTypes.string,
    /** Message to send when the input value resolves in "valid" */
    validMessage: PropTypes.string,
    /** Function to use as filter for any upcoming value from the I/O flow to be set */
    filterIn: PropTypes.func,
    /** Function to use as filter for any outgoing value from the I/O flow to be serialized */
    filterOut: PropTypes.func,
    /** Fields to link. Any value change will be propagated to the fields within the same IOForm that match the link name and the field name */
    link: PropTypes.oneOf([ PropTypes.array, PropTypes.string ])
}

IOInput.defaultProps = {
    type: 'text',
    required: false,
    exclude: false
}

/**
 * Adds a new entry into the InputFactory registry of components to be used as inputs and returns a HOC with the wrapper IOInput
 * @param {string|array} type Type name(s) of the input to register
 * @param {registry} [registry] Name of the registry to use
 * @return {Function<Component>} 
 * */
export const withIO = (type, registry = 'default') => Component => {
    InputFactory.add(registry, type, Component)
    
    return class extends React.PureComponent {
        render() {
            return (
                <IOInput type={type} {...this.props} />
            )
        }
    }
}

export default IOInput





