import Icon from '../Icon'
import styles from './Loading.module.scss'

const Loading: React.FC = () => {
    return (
        <div className={styles.loading}>
            <Icon type="presentational" icon="music_note" />
            <Icon type="presentational" icon="music_note" />
            <Icon type="presentational" icon="music_note" />
            <Icon type="presentational" icon="music_note" />
        </div>
    )
}

export default Loading
