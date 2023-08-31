import { Outlet, useMatch } from 'react-router-dom'
import Header from '../../components/Header'
import styles from './App.module.scss'

const PageApp: React.FC = () => {
    const pageBandMatch = useMatch('/bands/:bandId')

    return (
        <div className={styles.page} id="app-page">
            <Header fixed type={pageBandMatch ? 'band' : 'full'} enableNavigateBack={!!pageBandMatch} />
            <div className={styles.content} id="app-page-content">
                <Outlet />
            </div>
        </div>
    )
}

export default PageApp
