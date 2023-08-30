import { Band } from '../../../types/entities/band'
import styles from './BandPoster.module.scss'

interface BandPosterProps {
    band: Band
}

const BandPoster: React.FC<BandPosterProps> = ({ band }) => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>
                <span>{band.name}</span>
                <img src={band.image} alt={band.name} />
            </h1>
            <div className={styles.info}>
                <p className={styles.info__genre}>{band.genre}</p>
                <img className={styles.info__image} src={band.image} alt={band.name} />
                <p className={styles.info__numPlays}>{band.numPlays}</p>
            </div>
        </section>
    )
}

export default BandPoster
