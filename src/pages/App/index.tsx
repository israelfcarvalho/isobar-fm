import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'

const PageApp: React.FC = () => {
    return (
        <div id="app-page">
            <Header />
            <div id="app-page-content">
                <Outlet />
            </div>
        </div>
    )
}

export default PageApp
