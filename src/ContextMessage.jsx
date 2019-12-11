import React from 'react'
import PropTypes from 'prop-types';
export const IOInputMessageContext = React.createContext({ set: () => {}, pool: {} })

/** Collects the information for any child node of type IOInput */
export class MessageContext extends React.PureComponent {
    

    registry = {}

    dispatch = (message = '', field) => {
        const reg = this.registry[field]
        if (reg) {
            Object.values(reg).forEach(setter => setter(message))
        }
    }

    subscribe = (field, uuid, setter) => {
        if (!this.registry[field]) {
            this.registry[field] = {}
        }
        this.registry[field][uuid] = setter
    }

    unsubscribe = (field, uuid) => {
        delete this.registry[field][uuid]
    }

    render() {
        return (
            <IOInputMessageContext.Provider value={{ subscribe: this.subscribe, unsubscribe: this.unsubscribe, dispatch: this.dispatch }}>
                {this.props.children}
            </IOInputMessageContext.Provider>
        )
    }
}
/** Message Holder for the Messages */
export class IOInputMessage extends React.PureComponent {

    static contextType = IOInputMessageContext;
    _identifier = null
    state={ message: '' }

    constructor(props) {
        super(props)

        this._identifier = `${props.for}_${(new Date()).getTime()}_${Math.round(Math.random()*10000)}`
    }

    componentDidMount() {
        this.context.subscribe(this.props.for, this._identifier, this.setter)
    }

    componentWillUnmount() {
        this.context.unsubscribe(this.props.for, this._identifier)
    }

    setter = (message) => {
        this.setState({ message })
    }

    render() {
        const { message } = this.state
        const { text } = this.props
        return (
            <>
                {text ? (message || '') : <label className="iof-message">{message || ''}</label>}
            </>
        )
    }
}


// export const IOInputMessage = (props) => (
//     <IOInputMessageContext.Consumer>
//         { context =>
//             <Fragment>
//                 {props.text ? (context.pool[props.for] || '') : <label className="iof-message">{context.pool[props.for] || ''}</label>}
//             </Fragment>
//         }
//     </IOInputMessageContext.Consumer>
// )

IOInputMessage.propTypes = {
    /** Name of the input which this label will be linked to */
    'for': PropTypes.string.isRequired,
    /** Name of the prop that indicates to render the text as a simple text node. */
    text: PropTypes.bool
}

IOInputMessage.defaultProps = {
    text: false
}
