import styles from './Searchbar.module.scss'

interface SearchBarProps {
    label: string
    placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({label, placeholder}) => {
    return <input aria-label={label} className={styles.searchbar} type="text"  placeholder={placeholder ?? label}/>
}

export default SearchBar