import { useEffect, useState } from 'react'
import axios from 'axios'

import { Band } from '../../../types/entities/band'
import BandCard from '../Card'
import styles from './List.module.scss'
import Icon from '../../Icon'

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

    return (
        <>
            <ul className={styles.list}>
                {bands.map(band => (
                    <>
                        <li className={styles.band} key={band.id}>
                            <BandCard band={band} />
                        </li>
                        <div className={styles.divider} />
                    </>
                ))}
            </ul>
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
