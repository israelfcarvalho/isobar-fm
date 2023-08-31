import { useCallback, useState } from 'react'
import { Band } from '../../../types/entities/band'
import { className } from '../../../utils/classname'
import Icon from '../../Icon'
import styles from './BandDescription.module.scss'

interface BandDescriptionProps {
    band: Band
}

const BandDescription: React.FC<BandDescriptionProps> = ({ band }) => {
    const [showAll, setShowAll] = useState(false)

    const toggleShowAll = useCallback(() => {
        setShowAll(prevValue => !prevValue)
    }, [])

    const injectDescriptionMaxHeight = (ref: HTMLParagraphElement | null) => {
        if (ref) {
            ref.style.setProperty('--description-max-height', `${ref.scrollHeight}px`)
        }
    }

    return (
        <section className={styles.container}>
            <p
                ref={injectDescriptionMaxHeight}
                className={className(styles.description, showAll && styles['description--showAll'])}
                dangerouslySetInnerHTML={{ __html: band.biography }}
            ></p>
            <div className={className(styles.divider, styles.divider__left)}></div>
            <Icon
                ariaLabel={showAll ? 'Esconder descrição completa!' : 'Ver descrição completa!'}
                className={styles.icon}
                type="button"
                icon={showAll ? 'remove' : 'add'}
                onClick={toggleShowAll}
            />
            <div className={className(styles.divider, styles.divider__right)}></div>
        </section>
    )
}

export default BandDescription
