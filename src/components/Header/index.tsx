import { Link } from 'react-router-dom'
import Icon from '../Icon'
import SearchBar from '../SearchBar'
import styles from './Header.module.scss'

const Header: React.FC = () => {
    const handleSearch = (search: string) => {
        console.log({ search })
    }

    return (
        <header className={styles.header}>
            <Icon
                icon="chevron_left"
                type="button"
                ariaLabel="Go back"
                onClick={() => {
                    console.log('Go back')
                }}
            />

            <SearchBar outlined={false} label="Search Band" onSearch={handleSearch}></SearchBar>
            <Link className={styles.logo} to="/">
                isobar<span>.fm</span>
            </Link>
        </header>
    )
}

export default Header
