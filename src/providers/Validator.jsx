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
    /** Triggered when a IOInput in the node tree changes */
    validations: PropTypes.object.isRequired,
    /** Triggered when a IOInput type submit is clicked within the tree */
    defaultMessage: PropTypes.string,
    /** Triggered when a IOInput in the node tree blurs out */
    messages: PropTypes.object
}