import { useEffect, useState } from 'react'
import { Band } from '../../../types/entities/band'
import BandCard from '../Card'
import axios from 'axios'

const BandList: React.FC = () => {
    const [bands, setBands] = useState<Array<Band>>([])

    const emptyList = !bands.length

    useEffect(() => {
        axios.get('https://dws-recruiting-bands.dwsbrazil.io/api/bands').then(res => {
            setBands(res.data)
        })
    }, [])

    return (
        <ul>
            {bands.map(band => (
                <li key={band.id}>
                    <BandCard band={band} />
                </li>
            ))}

            {emptyList && <li key="empty_list">Sem resultados...</li>}
        </ul>
    )
}

export default BandList
