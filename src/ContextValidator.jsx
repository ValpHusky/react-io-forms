import * as React from 'react'
import * as PropTypes from 'prop-types';

export const IOInputValidatorContext = React.createContext(null)

/** Collects the information for any child node of type IOInput */
export class ValidatorContext extends React.PureComponent {
    render() {
        return (
            <IOInputValidatorContext.Provider value={this.props}>
                {this.props.children}
            </IOInputValidatorContext.Provider>
        )
    }
}

ValidatorContext.propTypes = {
    /** Object that contains as key:string-value:(RegExp|Function) pair the set of messages for each validation */
    validations: PropTypes.object.isRequired,
    /** Default message to show in case a message is not defined. */
    defaultMessage: PropTypes.string,
    /** Default message to show in case an Input fails the required validation */
    requiredMessage: PropTypes.string,
    /** Object that contains as key:string-value:string pair the set of messages for each validation */
    messages: PropTypes.object
}