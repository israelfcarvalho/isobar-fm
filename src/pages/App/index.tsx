import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import styles from './App.module.scss'

const PageApp: React.FC = () => {
    return (
        <div className={styles.page} id="app-page">
            <Header />
            <div id="app-page-content">
                <Outlet />
            </div>
        </div>
    )
}

export default PageApp
