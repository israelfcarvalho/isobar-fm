export function className(...classeNames: Array<string | false>): string {
    const initialClassName = ''

    return classeNames.reduce<string>((fullClassName, className) => {
        const hasClassName = !!className && !!className.trim()

        if (!hasClassName) {
            return fullClassName
        }

        return `${fullClassName} ${className}`
    }, initialClassName)
}
