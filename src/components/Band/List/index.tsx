import { useEffect, useState } from 'react'
import axios from 'axios'

import { Band } from '../../../types/entities/band'
import BandCard from '../Card'
import styles from './List.module.scss'

const BandList: React.FC = () => {
    const [bands, setBands] = useState<Array<Band>>([])

    const emptyList = !bands.length

    useEffect(() => {
        axios.get('https://dws-recruiting-bands.dwsbrazil.io/api/bands').then(res => {
            setBands(res.data)
        })
    }, [])

    return (
        <ul className={styles.list}>
            {bands.map(band => (
                <>
                    <li className={styles.band} key={band.id}>
                        <BandCard band={band} />
                    </li>
                    <div className={styles.divider} />
                </>
            ))}

            {emptyList && <li key="empty_list">Sem resultados...</li>}
        </ul>
    )
}

export default BandList
