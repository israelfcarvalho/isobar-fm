import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../Icon'
import SearchBar from '../SearchBar'
import styles from './Header.module.scss'
import { className } from '../../utils/classname'

interface HeaderProps {
    enableNavigateBack?: boolean
    fixed?: boolean
}

const Header: React.FC<HeaderProps> = ({ enableNavigateBack = false, fixed = false }) => {
    const [, setSearchParams] = useSearchParams()

    const handleSearch = (search: string) => {
        console.log({ search })
        setSearchParams(prev => {
            prev.set('bandFilter', search)
            return prev
        })
    }

    return (
        <header
            className={className(
                styles.header,
                fixed && styles['header--fixed'],
                enableNavigateBack && styles['header--backNavigation']
            )}
        >
            {enableNavigateBack && (
                <Icon
                    icon="chevron_left"
                    type="button"
                    ariaLabel="Go back"
                    onClick={() => {
                        console.log('Go back')
                    }}
                />
            )}

            <SearchBar outlined={false} label="Search Band" onSearch={handleSearch}></SearchBar>
            <Link className={styles.logo} to="/">
                isobar<span>.fm</span>
            </Link>
        </header>
    )
}

export default Header
