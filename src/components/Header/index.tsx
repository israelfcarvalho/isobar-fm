import { useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../Icon'
import SearchBar from '../SearchBar'
import styles from './Header.module.scss'
import { className } from '../../utils/classname'
import BandListInfo from '../Band/List/Info'
import { useCallback } from 'react'
import { Band } from '../../types/entities/band'

type HeaderTypes = 'full' | 'band'

interface HeaderProps {
    enableNavigateBack?: boolean
    fixed?: boolean
    type?: HeaderTypes
}

const Header: React.FC<HeaderProps> = ({ enableNavigateBack = false, fixed = false, type = 'full' }) => {
    const navigate = useNavigate()
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
            <header
                className={className(
                    styles.header,
                    styles[type],
                    enableNavigateBack && styles[`${type}--backNavigation`]
                )}
            >
                {enableNavigateBack && (
                    <Icon
                        className={styles.icon}
                        icon="chevron_left"
                        type="button"
                        ariaLabel="Go back"
                        onClick={() => navigate(-1)}
                    />
                )}

                {type === 'full' && (
                    <SearchBar
                        outlined={false}
                        label="Search Band"
                        onSearch={handleSearch}
                        initialTerm={searchParams.get('bandFilter') || ''}
                    ></SearchBar>
                )}
                <h1 className={styles.logo}>
                    isobar<span>.fm</span>
                </h1>
            </header>
            {type === 'full' && <BandListInfo results={bandResults} onSelectSortOption={handleSelectSortOption} />}
        </section>
    )
}

export default Header
