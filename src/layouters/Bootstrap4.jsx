import React, { Fragment } from 'react'

const singlePend = (pend) => (
    <Fragment>
        {_.isString(pend) ?
            <div className="input-group-text">
                {pend}
            </div>
            :
            pend
        }
    </Fragment>
)

const pendRender = (pend) => {
    if (_.isArray(pend)) {
        return pend.map(p => singlePend(p))
    }
    return singlePend(pend)
}

const classes = ({ valid, invalid }) => {
    const feedbackClass = invalid ? 
        'text-danger' : valid ? 
        'text-success' : 'text-muted';

    const fieldClass = invalid ? 
        'is-invalid' : valid ? 
        'is-valid' : '';

    return { fieldClass, feedbackClass }
}

const extractOptions = (props) => {
    const { children } = props
    const { options } = props.ioProps
        
    if (!options) {
        const synOptions = []
        React.Children.forEach(children, element => {
            if (!React.isValidElement(element)) return
            
            const { value, children: label } = element.props
            value && synOptions.push({ value, label })
        })
        return synOptions
    } else {
        return options
    }
}

const wrapper = (Component, props) => {
    const { type } = props.ioProps
    switch(type) {
        case 'radio':
            return wrapperRadioGroup(Component, props)
        case 'checkbox':
            return wrapperCheckGroup(Component, props)
        default:
            return wrapperInputGroup(Component, props)
    }
}

const wrapperRadioGroup = (Component, props) => {
    const { prepend, append, label, inline, className, value, setValue, children, ioProps, ...rest } = props
    const { name, message } = ioProps
    const { fieldClass, feedbackClass } = classes(props.ioProps)
    const options = extractOptions(props)
    const inlineClasses = !!inline ? 'col-12': undefined;
    return (
        <Fragment>
            {label &&
                <label className={inlineClasses}>{label}</label>
            }
            <div className={inlineClasses}>
                {options.map(option => (
                    <div key={`radio_${name}_${option.value.toString()}`} className={`form-check${!!inline ? '-inline' : ''}`}>
                        <label className="form-check-label">
                            <input
                                id={`radio_${name}_${option.value.toString()}`}
                                className={`form-check-input ${fieldClass} ${className || ''}`}
                                type="radio"
                                value={option.value}
                                onChange={e => setValue(option.value)}
                                checked={option.value === value}
                                {...rest}
                            />
                            {option.label}
                        </label>
                        {message &&
                            <small className={`form-text ${feedbackClass}`}>{rest.ioProps.message}</small>
                        }
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

const wrapperCheckGroup = (Component, props) => {
    const { prepend, append, label, inline, className, ...rest } = props
    const { fieldClass, feedbackClass } = classes(props.ioProps)
    return (
        <div className={`form-check${!!inline ? '-inline' : ''}`}>
            <label className="form-check-label">
                <Component className={`form-check-input ${fieldClass} ${className || ''}`} {...rest} />{label}
            </label>
            {rest.ioProps.message &&
                <small className={`form-text ${feedbackClass}`}>{rest.ioProps.message}</small>
            }
        </div>
    )
}

const wrapperInputGroup = (Component, props) => {
    const { prepend, append, label, inline, className, ...rest } = props
    const { fieldClass, feedbackClass } = classes(props.ioProps)
    const { label: labelClass = 'col', input: inputClass = 'col'  } = inline || { label: '', input: '' }
    return (
        <Fragment>
            {label &&
                <label className={labelClass} htmlFor={rest.id || rest.name}>{label}</label>
            }
            <div className={`input-group ${inputClass}`}>
                {!!prepend &&
                    <div className="input-group-prepend">
                        {pendRender(prepend)}
                    </div>
                }
                <Component className={`form-control ${fieldClass} ${className || ''}`.trim()} {...rest} />
                {!!append &&
                    <div className="input-group-append">
                        {pendRender(append)}
                    </div>
                }
            </div> 
            {rest.ioProps.message &&
                <small className={`form-text ${feedbackClass} ${!!inline?'col-12 text-right':''}`}>{rest.ioProps.message}</small>
            }
        </Fragment>
    )
}

export default function layouter(Component, props) {
    const { inline } = props
    return (
        <div className={`form-group ${!!inline ? 'row' : ''}`}>
            {wrapper(Component, props)}
        </div>
    )
}