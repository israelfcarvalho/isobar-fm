import { useCallback, useRef, useState } from 'react'
import { Band } from '../../../types/entities/band'
import { className } from '../../../utils/classname'
import Icon from '../../Icon'
import styles from './BandDescription.module.scss'

interface BandDescriptionProps {
    band: Band
}

const BandDescription: React.FC<BandDescriptionProps> = ({ band }) => {
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const [showAll, setShowAll] = useState(false)

    const toggleShowAll = useCallback(() => {
        setShowAll(prevValue => !prevValue)
    }, [])

    console.log(descriptionRef.current?.scrollHeight)

    return (
        <section className={styles.container}>
            <p
                ref={ref => {
                    if (ref) {
                        ref.style.setProperty('--description-max-height', `${ref.scrollHeight}px`)
                    }
                }}
                className={className(styles.description, showAll && styles['description--showAll'])}
                dangerouslySetInnerHTML={{ __html: band.biography }}
            ></p>
            <div className={className(styles.divider, styles.divider__left)}></div>
            <Icon className={styles.icon} type="button" icon="add" onClick={toggleShowAll} />
            <div className={className(styles.divider, styles.divider__right)}></div>
        </section>
    )
}

export default BandDescription
