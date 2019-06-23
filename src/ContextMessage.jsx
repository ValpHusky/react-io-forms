import * as React from 'react'
import PropTypes from 'prop-types';
export const IOInputMessageContext = React.createContext({ set: () => {}, pool: {} })

/** Collects the information for any child node of type IOInput */
export class MessageContext extends React.PureComponent {
    static propTypes = {
    }

    state = {
        pool: {}
    }

    setPool = (message = '', field) => {
        const { pool } = this.state
        if (field) {
            this.setState({ pool: { ...pool, [field]: message } })
        }
    }

    render() {
        const { pool } = this.state
        return (
            <IOInputMessageContext.Provider value={{ set: this.setPool, pool: { ...pool }}}>
                {this.props.children}
            </IOInputMessageContext.Provider>
        )
    }
}
/** Message Holder for the Messages */
export const IOInputMessage = (props) => (
    <IOInputMessageContext.Consumer>
        { context =>
            <label className="IOInput-message">{context.pool[props.for] || ''}</label>
        }
    </IOInputMessageContext.Consumer>
)

IOInputMessage.propTypes = {
    /** Name of the input which this label will be linked to */
    'for': PropTypes.string.isRequired
}