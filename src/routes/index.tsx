import { RouteObject } from 'react-router-dom'
import PageApp from '../pages/App'
import PageBands from '../pages/Bands'
import PageError from '../pages/Error'

export const routes: Array<RouteObject> = [
    {
        path: '/',
        Component: PageApp,
        errorElement: <PageError />,
        children: [{ path: '/bands', Component: PageBands }],
    },
]
