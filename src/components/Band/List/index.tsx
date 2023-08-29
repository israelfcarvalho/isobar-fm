import { useEffect, useState } from 'react'
import axios from 'axios'

import { Band } from '../../../types/entities/band'
import BandCard from '../Card'
import styles from './List.module.scss'
import Icon from '../../Icon'
import Loading from '../../Loading'

const BandList: React.FC = () => {
    const [bandsFetched, setBandsFetched] = useState(false)
    const [bands, setBands] = useState<Array<Band>>([])

    const emptyList = !bands.length && bandsFetched

    useEffect(() => {
        axios
            .get('https://dws-recruiting-bands.dwsbrazil.io/api/bands')
            .then(res => {
                setBands(res.data)
            })
            .finally(() => {
                setBandsFetched(true)
            })
    }, [])

    const renderDivider = (index: number) => {
        const show = index + 1 < bands.length
        return show && <li className={styles.divider} />
    }

    return (
        <>
            {bandsFetched ? (
                <ul className={styles.list}>
                    {bands.map((band, index) => (
                        <>
                            <li className={styles.band} key={band.id}>
                                <BandCard band={band} />
                            </li>
                            {renderDivider(index)}
                        </>
                    ))}
                </ul>
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
