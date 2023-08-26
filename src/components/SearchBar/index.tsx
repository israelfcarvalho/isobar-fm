import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import { className } from '../../utils/hooks/classname'
import Icon from '../Icon'
import styles from './Searchbar.module.scss'

interface SearchBarProps {
    label: string
    placeholder?: string
    outlined?: boolean
    onSearch: FormEventHandler<HTMLFormElement>
}

const SearchBar: React.FC<SearchBarProps> = ({ label, placeholder, outlined = true, onSearch }) => {
    const [focused, setFocused] = useState(false)
    const [term, setTerm] = useState('')

    const handleChangeTerm = (event: ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value)
    }

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        onSearch(event)
    }

    return (
        <form className={styles.container} onSubmit={handleSearch}>
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
                <button className={className(styles.iconClose)} type="button">
                    <Icon icon="close" size="inherit" />
                </button>
            )}
            <span className={className(styles.iconSearch, focused && styles['iconSearch--focused'])}>
                <Icon icon="search" />
            </span>
        </form>
    )
}

export default SearchBar
