import { RouteObject } from 'react-router-dom'
import PageBands from '../pages/Bands'
import PageError from '../pages/Error'
import PageBand from '../pages/Bands/[bandId]'

export const routes: Array<RouteObject> = [
    {
        path: '/bands',
        Component: PageBands,
        errorElement: <PageError />,
        children: [
            { path: 'bands', Component: PageBands },
            { path: 'bands/:bandId', Component: PageBand },
        ],
    },
]
