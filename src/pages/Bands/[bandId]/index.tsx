import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Band } from '../../../types/entities/band'
import Loading from '../../../components/Loading'
import BandPoster from '../../../components/Band/Poster'
import styles from './PageBand.module.scss'
import { className } from '../../../utils/classname'
import BandDescription from '../../../components/Band/Description'
import BandAlbuns from '../../../components/Band/Album/List'
import api from '../../../services/api'

const PageBand: React.FC = () => {
    const [band, setBand] = useState<Band>()
    const { bandId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        function navigateBack() {
            navigate('/bands', { replace: true })
        }

        api.get(`bands/${bandId}`)
            .then(res => {
                if (res.data) {
                    setBand(res.data)
                } else {
                    navigateBack()
                }
            })
            .catch(err => {
                console.log({ err })
                navigateBack()
            })
    }, [bandId, navigate])

    return (
        <div className={className(styles.page, !band && styles['page--loading'])}>
            {band ? (
                <>
                    <BandPoster band={band} />
                    <BandDescription band={band} />
                    <BandAlbuns band={band} />
                </>
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default PageBand
