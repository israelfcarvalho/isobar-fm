import { Band } from '../../../../types/entities/band'
import AlbumCard from '../Card'
import styles from './BandAlbumList.module.scss'

interface BandAlbumListProps {
    band: Band
}

const BandAlbumList: React.FC<BandAlbumListProps> = ({ band }) => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Albuns</h1>
            <ul className={styles.albums}>
                {band.albums.map(album => (
                    <AlbumCard key={album} albumId={album} />
                ))}
            </ul>
        </section>
    )
}

export default BandAlbumList
