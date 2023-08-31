import { useEffect, useState } from 'react'
import axios from 'axios'

import { Album } from '../../../../types/entities/album'
import Loading from '../../../Loading'
import styles from './BandAlbumCard.module.scss'

interface AlbumCardProps {
    albumId: string
}

const AlbumCard: React.FC<AlbumCardProps> = ({ albumId }) => {
    const [album, setAlbum] = useState<Album>()

    useEffect(() => {
        axios.get(`https://dws-recruiting-bands.dwsbrazil.io/api/albums/${albumId}`).then(res => {
            setAlbum(res.data)
        })
    }, [albumId])

    return <li className={styles.container}>{album ? <img src={album.image} alt={album.name} /> : <Loading />}</li>
}

export default AlbumCard
