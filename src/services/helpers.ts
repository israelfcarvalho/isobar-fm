export function debounce<F extends (...args: Array<any>) => any>(func: F, timeout: number) {
    let timer: ReturnType<typeof setTimeout>

    return function (...args: Parameters<F>) {
        clearTimeout(timer)

        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}
