import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Bootstrap4 from './layouters/Bootstrap4'

export const defaultLayouter = (Component, props) => (<Component {...props} />)
export const IOInputLayoutContext = React.createContext(defaultLayouter)

export class LayoutContext extends React.Component {
    static propTypes = {
        /** Name of the available Layouter of your choosing */
        layouter: PropTypes.oneOfType([PropTypes.oneOf(['Bootstrap4']), PropTypes.func]).isRequired,
    }

    state = {
        layouter: defaultLayouter
    }

    componentDidMount() {
        const { layouter } = this.props
        if (_.isFunction(layouter)) {
            this.setState({ layouter })
        } else if (_.isString(layouter)) {
            switch(layouter) {
                case 'Bootstrap4':
                    return this.setState({ layouter: Bootstrap4 })
                default:
                    return this.setState({ layouter: defaultLayouter })
            }
        } else {
            throw new Error(`[ReactIOForms::Invalid provided layouter] given: ${layouter}`)
        }
    }

    render() {
        return (
            <IOInputLayoutContext.Provider value={this.state.layouter}>
                {this.props.children}
            </IOInputLayoutContext.Provider>
        )
    }
}
