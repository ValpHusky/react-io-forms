
/** Determines the bootstrap input classes by its valid and invalid values */
export function classNameByValidity(valid, invalid) {
    return `${valid && !invalid ? 'valid' : ''} ${invalid ? 'invalid' : ''}`.trim()
}

export function classNameCreate(type, valid, invalid) {
    return `iof-input iof-${type} ${classNameByValidity(valid, invalid)}`.trim()
}

/** Generates a pause within an async function */
export function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}