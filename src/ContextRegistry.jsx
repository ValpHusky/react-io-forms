import React, { Fragment } from 'react'
import * as PropTypes from 'prop-types';
import InputFactory from './core/InputFactory';

export const IOInputRegistryContext = React.createContext(null)

/** Collects the information for any child node of type IOInput */
export class RegistryContext extends React.PureComponent {

    constructor(props) {
        super(props)

        InputFactory.register(props.name, props.entry)
    }

    render() {
        const { main } = this.props
        return (
            <Fragment>
                { main ? 
                    <IOInputRegistryContext.Provider value={this.props.name}>
                        {this.props.children}
                    </IOInputRegistryContext.Provider>
                    :
                    this.props.children
                }
            </Fragment>
        )
    }
}

RegistryContext.propTypes = {
    /** Name of the registry to use for all the child node IOInput's in the tree */
    name: PropTypes.string.isRequired,
    /** Entries to add to the registry */
    entry: PropTypes.array.isRequired,
    /** Indicates that the entry will be the default entry to take when a IOInput is invoked */
    main: PropTypes.bool
}

RegistryContext.defaultProps = {
    main: false
}