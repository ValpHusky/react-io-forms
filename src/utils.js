/** Extracts a subset of messages specified by certain prefix */
export function getMessagesFromIntl(intlmessages, prefix, removePrefix = false) {
    if (intlmessages) {
        const keys = Object.keys(intlmessages).filter(k => k.indexOf(prefix) === 0)
        const validationMessages =  _.pick(intlmessages, keys)
        if (removePrefix) {
            return _.mapKeys(validationMessages, (v, k) => k.replace(prefix, ''))
        }
        return validationMessages
    }
    return null
}
/** Includes only the props from the given props by the coincidence in the list */
export function include(props, list) {
    return _.pick(props, Object.keys(list))
}
/** Excludes the props from the given props by the coincidence in the list */
export function exclude(props, list) {
    return _.omit(props, Object.keys(list))
}