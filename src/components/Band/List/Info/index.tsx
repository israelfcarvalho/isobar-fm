import { useState } from 'react'
import Icon from '../../../Icon'
import styles from './BandListInfo.module.scss'
import { Band } from '../../../../types/entities/band'

interface BandListInfoProps {
    results: number
    onSelectSortOption: (sortBy: keyof Band) => void
}

const BandListInfo: React.FC<BandListInfoProps> = ({ results, onSelectSortOption }) => {
    const [showOptions, setShowOptions] = useState(false)

    function hanldeSelectSortOption(sortBy: keyof Band) {
        onSelectSortOption(sortBy)
        setShowOptions(false)
    }

    return (
        <div className={styles.info}>
            <h1 className={styles.info__results}>{results} resultados</h1>
            <Icon
                className={styles.info__sort}
                icon="sync_alt"
                type="button"
                ariaLabel="Ordenar Bandas"
                buttonType="button"
                onClick={() => setShowOptions(show => !show)}
            ></Icon>
            {showOptions && (
                <div className={styles.info__sortOptions}>
                    <button onClick={() => hanldeSelectSortOption('name')}>ORDEM ALFABETICA</button>
                    <button onClick={() => hanldeSelectSortOption('numPlays')}>POPULARIDADE</button>
                </div>
            )}
        </div>
    )
}

export default BandListInfo
