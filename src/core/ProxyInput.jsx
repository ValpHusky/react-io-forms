import * as React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types';
import InputFactory from './InputFactory';
import Observable from './Observable';

import { InputError, EmptyValueError } from './InputError';
import { SkipFieldError } from './SkipFieldError';

/** Core Component of the IOForms Library. This component renders the real input */
class ProxyInput extends React.PureComponent  {
    static propTypes = {
        /** All the props derived from the React context handlers used in IOForms */
        contextProps: PropTypes.object,
        /** IO Unique props for the Proxy Input to consume */
        ioProps: PropTypes.object,
        /** Standard input props delivered by the implementor all the way to the core component */
        standardProps: PropTypes.object,
        ignoreMessagePool: PropTypes.bool,
    }

    static builtInValidations = {
        letters: /^[a-zA-Z\s]+$/,
        numbers: /^[0-9]+$/,
        numeric: /^[0-9\.,]+$/,
        email:   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    }

    observer = new Observable()
    controllerReference = null
    Component = null
    state = {}

    constructor(props) {
        super(props)

        this.Component = InputFactory.get(
            _.get(props, 'ioProps.type','default'), 
            _.get(props, 'contextProps.registry', 'default')
        )

        this.state = {
            value: this.getInitialValue(props),
            invalid: _.get(props, 'ioProps.invalid', false),
            valid: _.get(props, 'ioProps.valid', false),
            message: ''
        }

        this.controllerReference = {
            observe: this.observe, 
            collect: this.collect, 
            notify: this.notify, 
            inject: this.inject,
            reset: this.reset,
            props: () => this.props,
        }

    }

    async componentDidUpdate(prevProps) {
        const prevValue = _.get(prevProps, 'ioProps.value')
        const curValue = _.get(this.props, 'ioProps.value')
        const { value } = this.state
        let shouldrun = false
        
        if (!this.isEqual(prevValue, curValue) && !this.isEqual(curValue, value)) {
            await this.setValue(this.filterIn(curValue))
            shouldrun = true
        }
        if (prevProps.ioProps.required !== this.props.ioProps.required) {
            shouldrun = true
        }

        if (shouldrun) { this.runInitialValue() }
    }

    componentDidMount() {
        const { contextProps } = this.props
        const { name } = this.props.ioProps
 
        if(this.validProps(this.props)) {
            
            const form = _.get(contextProps, 'form.register')
            const linkage = _.get(contextProps, `linkage.register`)

            form && form(name, this.controllerReference) 
            linkage && linkage(name, this.controllerReference)
        }
        this.runInitialValue()
    }

    componentWillUnmount() {
        const { contextProps } = this.props
        const form = _.get(contextProps, 'form.unregister')
        const linkage = _.get(contextProps, `linkage.unregister`)

        form && form(name, this.controllerReference) 
        linkage && linkage(name, this.controllerReference)

        this.observer = new Observable()
    }

    async runInitialValue() {
        const { required, validate } = this.props.ioProps
        const { value } = this.state

        if (!required && this.isEmptyValue(value)) {
            this.setValidity(true)
            this.clearMessage()
        } else if (!this.isEmptyValue(value)) {
            try {
                await this.verify(value, validate)
                this.setValidity(true)
                this.clearMessage()
            } catch(e) {}
        }
    }

    

    getInitialValue(props) {
        let value = this.filterIn(_.get(props, 'ioProps.value'))
        const defaultValue = _.get(this.props, 'ioProps.defaultValue')
        if (value === undefined || value === null) {
            if (defaultValue) {
                value = defaultValue
            } else {
                value = this.Component.emptyValue !== undefined ? this.Component.emptyValue : ''
            }
        }
        return value
    }

    validProps(props) {
        const { ioProps } = props
        if (!_.get(ioProps, 'name')) {
            throw new Error('IOForms::Input name cannot be null or empty')
        }
        return true
    }

    isEqual(val1, val2) {
        const equality = _.get(this.Component, 'isEqual') || _.isEqual
        return equality(val1, val2)
    }

    isEmptyValue(value) {
        const emptyValue = _.get(this.Component, 'emptyValue', '')
        return (value === null || value === undefined || this.isEqual(value, emptyValue))
    }

    setValidity = (state) => {
        const { contextProps } = this.props
        const { name } = this.props.ioProps
        _.defer(() => {
            const setValidity = _.get(contextProps, 'form.setValidity')
            setValidity(name, state)
        })
    }

    runcycle = async () => {
        const { onValue, name } = this.props.ioProps
        const { value } = this.state
        try {
            const val = await this.collect()
            onValue && onValue(val, name, { originalValue: value })
            this.setValidity(true)
        } catch (e) {
            this.setValidity(false)
            throw e
        }
    }

    inject = (value, origin) => {
        const filteredValue = this.filterIn(value, origin)

        return new Promise((resolve) => {
            this.setValue(filteredValue, () => {
                resolve()
            })
        })
    }

    observe = async (caller) => {
        return this.observer.add(caller)
    }

    collect = async (strict = false) => {
        const { value } = this.state
        const { validate, validMessage, onValid, exclude, include } = this.props.ioProps
        const shouldNotfityValidity = !!validate && !this.isEmptyValue(value)
        let val

        await this.verify(value, validate)
        this.sendMessage('')
        
        
        _.defer(() => {
            this.setState({ message: '', invalid: false, valid: shouldNotfityValidity })
            shouldNotfityValidity && validMessage && this.info(validMessage)
            shouldNotfityValidity && onValid && onValid(val)
        })
        val = this.filterOut(value)
        if (strict && (exclude || (!include && this.isEmptyValue(val))) ) {
            throw new SkipFieldError()
        }
        return val
    }

    notify = async (message) => {
        const { onInvalid, name } = this.props.ioProps
        if (message) {
            if (message instanceof InputError) {
                if (!message.names() || message.includes(name)) {
                    _.defer(() => {
                        this.setState({ message: message.toString(), invalid: true, valid: false })
                        onInvalid && onInvalid(message, name)
                    })
                    return this.error(message.toString(), message)
                }

            } else if (message instanceof Error) {
                console.error(message)
            } else {
                return this.info(message.toString())
            }
        }
    }

    filterIn = (value, origin = null) => {
        const { filterIn, name } = this.props.ioProps
        const { value: currentValue } = this.state
        return filterIn ? filterIn(value, origin || name, currentValue) : value
    }

    filterOut = (value) => {
        const { filterOut } = this.props.ioProps
        return filterOut ? filterOut(value): value
    }

    async verify(value, validate) {
        const { validation } = this.props.contextProps
        const { required, name, invalidMessage } = this.props.ioProps
        const defaultMessage = _.get(validation, 'defaultMessage')
        const requiredMessage = _.get(validation, 'requiredMessage')
        
        const validator = this.getValidationFunction(validate)
        const isEmpty = this.isEmptyValue(value)

        if (required && isEmpty) {
            throw new EmptyValueError(invalidMessage || requiredMessage, name, { value })
        } else if (validate && !isEmpty) {
            const { valid, message } = validator(value)
            if (valid) {
                return value
            }
            throw new InputError(invalidMessage || message || defaultMessage , name, { value })
        }
        return value
        
    }

    getValidationFunction(validate, proxymessage = null) {
        const { validation } = this.props.contextProps
        const message  = _.get(validation, `messages.${validate}`) || proxymessage

        if (_.isArray(validate)) {
            const validations = validate.map(v => this.getValidationFunction(v))
            return (value) => {
                const results = validations.map(v => v(value)).filter(r => !r.valid)
                if (results.length > 0) {
                    return results[0]
                }
                return { valid: true }
            }
        }
        else if (_.isString(validate)) {
            const entry = _.get(validation, `validations.${validate}`, ProxyInput.builtInValidations[validate])
            if (!entry) {
                return (value) => ({ valid: (new RegExp(validate)).test(value), message })
            } else if (_.isString(entry) || entry instanceof RegExp) {
                return (value) => ({ valid: (new RegExp(entry)).test(value), message })
            } else {
                return this.getValidationFunction(entry, message)
            }
        } else if (_.isFunction(validate)) {
            return (value) => {
                const test = validate(value)
                if (_.isBoolean(test)) {
                    return { valid: test, message }
                } else {
                    return test
                }
            }
        } else if (_.isBoolean(validate)) {
            return (value) => ({ valid: validate, message })
        } else {
            return (value) => ({ valid: (new RegExp(validate)).test(value), message })
        }
    }

    setValue = (value) => {
        const { onChange } = this.props.ioProps
        _.defer(() => {
            onChange && onChange(value)
        })
        
        return new Promise((res) => {
            this.setState({ value }, () => {
                res(value)
            })
        })
        .then(async value => {
            await this.runcycle()
            this.observer.notify({ value: this.filterOut(value), ioProps: this.props.ioProps })
        })
        .catch(e => {
            this.notify(e)
            this.observer.notify({ value: this.filterOut(value), ioProps: this.props.ioProps, error: e })
            // throw e
        })
    }

    info = (message) => {
        const { value } = this.state
        this.sendMessage(message, value)
    }
    error = (message, inputError) => {
        const { value } = this.state
        this.sendMessage(message, value, inputError)
    }

    sendMessage(message, value, inputError = null) {
        const { messages } = this.props.contextProps
        const { onMessage, name } = this.props.ioProps
        
        _.defer(() => {
            if (!this.props.ignoreMessagePool) {
                messages.dispatch && messages.dispatch(message, name)
            }
            onMessage && onMessage(message, { value, name, error: inputError })
        })
    }

    clearMessage() {
        const { name } = this.props.ioProps
        const { messages } = this.props.contextProps
        messages.set && messages.set('', name)
        this.setState({ message: '' })
    }

    reset = () => {
        const emptyValue = _.get(this.Component, 'emptyValue', '')
        const defaultValue = _.get(this.props, 'ioProps.defaultValue')
        const dval = _.isFunction(defaultValue) ? defaultValue() : defaultValue
        this.setState({ value: dval || emptyValue, valid: false, invalid: false })
    }

    render() {
        const { standardProps: { ignoreMessagePool, ...rest }, ioProps, contextProps: { layouter } } = this.props
        const { valid, invalid, value, message } = this.state
        const Component = this.Component

        return layouter(Component, { 
            ...rest,
            ioProps: { ...ioProps, valid, invalid, message },
            setValue: this.setValue,
            value
        })
    }
}

export default ProxyInput
