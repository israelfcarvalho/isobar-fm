import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../Icon'
import SearchBar from '../SearchBar'
import styles from './Header.module.scss'
import { className } from '../../utils/classname'
import BandListInfo from '../Band/List/Info'
import { useCallback } from 'react'
import { Band } from '../../types/entities/band'

interface HeaderProps {
    enableNavigateBack?: boolean
    fixed?: boolean
}

const Header: React.FC<HeaderProps> = ({ enableNavigateBack = false, fixed = false }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const bandResults = Number(searchParams.get('bandResults')) || 0

    const handleSearch = useCallback(
        (search: string) => {
            setSearchParams(prev => {
                prev.set('bandFilter', search)
                return prev
            })
        },
        [setSearchParams]
    )

    const handleSelectSortOption = useCallback(
        (sortBy: keyof Band) => {
            setSearchParams(prevSearch => {
                prevSearch.set('bandSort', sortBy)
                return prevSearch
            })
        },
        [setSearchParams]
    )

    return (
        <section className={className(styles.container, fixed && styles['container--fixed'])}>
            <header className={className(styles.header, enableNavigateBack && styles['header--backNavigation'])}>
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

                <SearchBar
                    outlined={false}
                    label="Search Band"
                    onSearch={handleSearch}
                    initialTerm={searchParams.get('bandFilter') || ''}
                ></SearchBar>
                <Link className={styles.logo} to="/">
                    isobar<span>.fm</span>
                </Link>
            </header>
            <BandListInfo results={bandResults} onSelectSortOption={handleSelectSortOption} />
        </section>
    )
}

export default Header
