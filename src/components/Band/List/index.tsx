import { Fragment, useState } from 'react'

import { Band } from '../../../types/entities/band'
import BandCard from '../Card'
import styles from './List.module.scss'
import Icon from '../../Icon'
import Loading from '../../Loading'
import BandListInfo from './Info'
import { useBands } from './hooks'
import { useSearchParams } from 'react-router-dom'

const BandList: React.FC = () => {
    const [searchParams] = useSearchParams()
    const bandFilter = searchParams.get('bandFilter')

    const [sortBy, setSortBy] = useState<keyof Band>()
    const { bands, bandsFetched } = useBands(sortBy, bandFilter)
    const emptyList = !bands.length && bandsFetched

    const renderDivider = (index: number) => {
        const show = index + 1 < bands.length
        return show && <li className={styles.divider} />
    }

    return (
        <>
            {bandsFetched ? (
                <>
                    <BandListInfo results={bands.length} onSelectSortOption={setSortBy} />
                    <ul className={styles.list}>
                        {bands.map((band, index) => (
                            <Fragment key={band.id}>
                                <li className={styles.band} key={band.id}>
                                    <BandCard band={band} />
                                </li>
                                {renderDivider(index)}
                            </Fragment>
                        ))}
                    </ul>
                </>
            ) : (
                <Loading />
            )}
            {emptyList && (
                <section className={styles.empty}>
                    <h1 className={styles.empty__title}>Sem resultados...</h1>
                    <Icon className={styles.empty__icon} type="presentational" icon="radio"></Icon>
                </section>
            )}
        </>
    )
}

export default BandList
