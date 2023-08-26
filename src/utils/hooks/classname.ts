export function className(...classeNames: Array<string | false>): string {
    const initialClassName = ''

    console.log({ classeNames })

    return classeNames.reduce<string>((fullClassName, className) => {
        const hasClassName = !!className && !!className.trim()

        console.log({ hasClassName, className })

        if (!hasClassName) {
            return fullClassName
        }

        return `${fullClassName} ${className}`
    }, initialClassName)
}
