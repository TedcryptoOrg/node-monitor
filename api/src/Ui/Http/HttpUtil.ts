export function convertBoolean(value: string|boolean|undefined): boolean|undefined {
    if (value === undefined) {
        return undefined
    }
    if (value === true || value === false) {
        return value
    }

    return value === '1' || value === 'on' || value === 'true';
}