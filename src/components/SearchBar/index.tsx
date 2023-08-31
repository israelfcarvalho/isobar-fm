import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { className } from '../../utils/classname'
import Icon from '../Icon'
import styles from './Searchbar.module.scss'
import { debounce } from '../../services/helpers'

interface SearchBarProps {
    label: string
    placeholder?: string
    outlined?: boolean
    onSearch: (term: string) => void
    initialTerm?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ initialTerm = '', label, placeholder, outlined = true, onSearch }) => {
    const [focused, setFocused] = useState(false)
    const [term, setTerm] = useState(initialTerm)

    const searchOnChange = useMemo(() => debounce(onSearch, 500), [onSearch])

    const handleChangeTerm = (event: ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value)

        searchOnChange(event.target.value)
    }

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        onSearch(term)
    }

    const clearSearch = () => {
        setTerm('')
    }

    return (
        <form className={styles.container} onSubmit={search}>
            <input
                value={term}
                aria-label={label}
                className={className(
                    styles.searchbar,
                    outlined && styles['searchbar--outlined'],
                    !!term && styles['searchbar--withContent']
                )}
                type="text"
                placeholder={placeholder ?? label}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeTerm}
            />
            {!!term && (
                <Icon
                    className={className(styles.iconClose)}
                    icon="close"
                    type="button"
                    buttonType="button"
                    onClick={clearSearch}
                    size="inherit"
                    ariaLabel="Clear Search"
                />
            )}
            <Icon
                className={className(styles.iconSearch, focused && styles['iconSearch--focused'])}
                icon="search"
                type="presentational"
            />
        </form>
    )
}

export default SearchBar
