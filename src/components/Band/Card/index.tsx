import { Link } from 'react-router-dom'
import { Band } from '../../../types/entities/band'
import styles from './BandCard.module.scss'

interface BandCardProps {
    band: Band
}

const BandCard: React.FC<BandCardProps> = ({ band }) => {
    return (
        <Link to={band.id} className={styles.card}>
            <img className={styles.img} src={band.image} alt={band.name} />
            <span className={styles.name}>{band.name}</span>
            <span className={styles.plays}>{band.numPlays} Plays</span>
        </Link>
    )
}

export default BandCard
