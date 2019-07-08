import * as React from 'react'
import * as PropTypes from 'prop-types';
import { MessageContext } from './ContextMessage'
import { LinkageContext } from './ContextLinkage'
import { InputError } from './core/InputError';

export const IOInputCollectorContext = React.createContext(null)

/** Collects the information for any child node of type IOInput */
export default class IOForm extends React.PureComponent {
    static propTypes = {
        /** Sets the id of the form tag element */
        id: PropTypes.string,
        /** Triggered when a IOInput type submit is clicked within the tree */
        onSubmit: PropTypes.func,
        /** When true the form will not perform any submit. Useful to block any subsecuent submit after the first one */
        lock: PropTypes.bool,
        /** Indicates that the form should reset after a successfull submit */
        reset: PropTypes.bool,
        /** Indicates that the data should be serialized as a FormData object */
        formdata: PropTypes.bool
    }
    static defaultProps = {
        lock: false,
        reset: false,
        formdata: false
    }

    fields = {}
    lock = false

    constructor(props) {
        super(props)
        this.lock = !!props.lock
    }
    componentDidUpdate() {
        this.lock = this.props.lock
    }

    serializeInto(obj, name, value) {
        if (obj instanceof FormData) {
            obj.append(name, value)
        } else if (_.isPlainObject(obj)) {
            obj[name] = value
        }
    }

    onSubmit = async (e) => {
        const { onSubmit, reset } = this.props
        e.preventDefault()
        if (!this.lock) {
            this.lock = true
            const values = await this.collect()
            if (values) {
                try {
                    const submitResult = onSubmit(values)
                    if (submitResult instanceof Promise) {
                        await submitResult
                    }
                    reset && this.reset()
                } catch(e) {
                    if (e instanceof InputError) {
                        this.notify(e)
                    } else {
                        console.error(e)
                    }
                }
            }
            this.lock = false
        }
    }

    async collect() {
        const { formdata } = this.props
        const values = formdata ? new FormData() : {}
        
        for(const i in this.fields) {
            try {
                const field = this.fields[i]
                this.serializeInto(values, i, await field.collect(true))
            } catch(e) {
                if (e instanceof InputError) {
                    console.log('IOForm::Serialization ended in error:', e)
                    return null
                }
            }
        }
        return values
    }

    async notify(e) {
        for(const i in this.fields) {
            await this.fields[i].notify(e)
        }
    }

    register = (name, controller) => {
        this.fields[name] = controller
    }

    unregister = (name) => {
        delete this.fields[name]
    }

    reset = async () => {
        for(const i in this.fields) {
            await this.fields[i].reset()
        }
    }

    onReset = (e) => {
        e.preventDefault()
        e.stopPropagation()

        !this.lock && this.reset()
    }

    render() {
        return (
            <MessageContext>
                <LinkageContext>
                    <IOInputCollectorContext.Provider value={{ register: this.register, unregister: this.unregister }}>
                        <form className="iof-main" onReset={this.onReset} id={this.props.id || undefined} onSubmit={this.onSubmit}>
                            <button style={{ display: 'none' }} />
                            {this.props.children}
                        </form>
                    </IOInputCollectorContext.Provider>
                </LinkageContext>
            </MessageContext>
        )
    }
}