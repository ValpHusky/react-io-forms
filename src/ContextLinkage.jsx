import React from 'react'
import _ from 'lodash'

export const IOInputLinkageContext = React.createContext()

export class LinkageContext extends React.Component {

    fields = {}

    register = (name, controller) => {
        this.fields[name] = controller
        controller.observe(this.valueChanged)
    }

    unregister = (name) => {
        delete this.fields[name]
    }

    valueChanged = ({ value, ioProps }) => {
        if (ioProps.link) {
            this.notify(ioProps.link, value)
        }
    }

    notify = (link, value) => {
        if (_.isArray(link)) {
            link.forEach(l => this.notify(l, value))
            return;
        }
        const fieldController = this.fields[link]
        if (fieldController) {
            fieldController.inject(value, link)
        }
    }

    render() {
        return (
            <IOInputLinkageContext.Provider value={{ register: this.register, unregister: this.unregister }}>
                {this.props.children}
            </IOInputLinkageContext.Provider>
        )
    }
}
