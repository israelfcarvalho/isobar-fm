import axios from 'axios'
import { useEffect, useReducer, useState } from 'react'
import { Band } from '../../../types/entities/band'

type Sortings = {
    // eslint-disable-next-line no-unused-vars
    [K in keyof Band]?: (bands: Array<Band>) => Array<Band>
}

const sortings: Sortings = {
    name: function (bands: Array<Band>) {
        return [...bands.sort((bandA, bandB) => bandA.name.localeCompare(bandB.name))]
    },
    numPlays: function (bands: Array<Band>) {
        return [...bands.sort((bandA, bandB) => bandB.numPlays - bandA.numPlays)]
    },
}

interface FetchBandsSuccessAction {
    type: 'FetchBandsSuccess'
    bands: Array<Band>
}

interface SortBandsAction {
    type: 'SortBands'
    sortBy: keyof Band
}

type BandsAction = FetchBandsSuccessAction | SortBandsAction

function bandsReducer(state: Array<Band>, action: BandsAction) {
    switch (action.type) {
        case 'FetchBandsSuccess': {
            return action.bands
        }

        case 'SortBands': {
            const sort = sortings[action.sortBy]
            return sort ? sort(state) : state
        }

        default: {
            return state
        }
    }
}

export function useBands(sortBy: keyof Band | undefined) {
    const [bands, dispatch] = useReducer(bandsReducer, [])
    const [bandsFetched, setBandsFetched] = useState(false)

    useEffect(() => {
        if (sortBy) {
            dispatch({ type: 'SortBands', sortBy })
        }
    }, [sortBy])

    useEffect(() => {
        axios
            .get('https://dws-recruiting-bands.dwsbrazil.io/api/bands')
            .then(res => {
                dispatch({ type: 'FetchBandsSuccess', bands: res.data })
            })
            .finally(() => {
                setBandsFetched(true)
            })
    }, [])

    return {
        bands,
        bandsFetched,
    }
}
