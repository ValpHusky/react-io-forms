import _ from 'lodash'

class InputFactory {
    /** Components registry to be used  */
    static registry = {}

    /**
    * Registers a new entry object into the provided registry
    * @param {string} registry Registry name
    * @param {Array<string>} entry Entry object consisting of <b>{ type: string, component: ReactElement }</b>
    */
    static register(registry, entry) {
        if (registry && entry && entry.length) {
            
            if (!InputFactory.registry[registry]) {
                InputFactory.registry[registry] = {}

                for(const reg of entry) {
                    InputFactory.add(registry, reg.type, reg.component)
                }
            }
            return entry;
        }
        InputFactory.registry[registry]
        throw new Error(`[IOInput]InputFactory::register Given params registry(${registry}) and entry(${entry}) cannot be null or empty.`)
    }

    /**
    * Adds a new component of type input to be rendered into the Given registry
    * @param {string} registry Registry name into which the component will be registered
    * @param {Array|string} type Type (or Array of types) to which associate your component to
    * @param {ReactElement} Component your given component
    */
    static add (registry, type, Component) {
        if(registry && type && type.length) {
            if (!InputFactory.registry[registry]) {
                InputFactory.registry[registry] = {}
            }
            if (_.isString(type)) {
                const current = InputFactory.registry[registry][type]
                if(current) {
                    console.log(`[IOInput]InputFactory::add Given type "${type}" was already registry for ${current}. Overriding for ${Component}`)
                }
                InputFactory.registry[registry][type] = Component
            } else if(_.isArray(type)) {
                type.forEach((k) => {
                    InputFactory.add(registry, k, Component)
                })
            }
        } else {
            throw new Error(`[IOInput]InputFactory::add Given param type cannot be null or empty`)
        }
        return Component
    }

    /**
    * Delivers to the invoker a new component instance chosen by the given key and injected with the given props
    * @param {string} type Type of the input
    */
    static get(type, registry = 'default') {
        let Component = InputFactory.registry[registry] ? InputFactory.registry[registry][type] : null
        if (!Component) {
            Component = InputFactory.registry['default'][type]
        }
        if (!Component) {
            Component = InputFactory.registry[registry]['default']
            console.warn(`[IOInput]InputFactory::render No Component available for the given type ${type} at registry ${registry}. Falling to default type`)
        }
        return Component
    }
}

export default InputFactory
