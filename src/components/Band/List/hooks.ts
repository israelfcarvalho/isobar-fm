import axios from 'axios'
import { useEffect, useReducer, useState } from 'react'
import { Band } from '../../../types/entities/band'

type Sortings = {
    // eslint-disable-next-line no-unused-vars
    [K in keyof Band]?: (bands: Array<Band>) => Array<Band>
}

const sortingReducers: Sortings = {
    name: function (bands: Array<Band>) {
        return [...bands.sort((bandA, bandB) => bandA.name.localeCompare(bandB.name))]
    },
    numPlays: function (bands: Array<Band>) {
        return [...bands.sort((bandA, bandB) => bandB.numPlays - bandA.numPlays)]
    },
}

interface FetchBandsSuccessAction {
    type: 'FETCH_BANDS_SUCCESS'
    bands: Array<Band>
}

interface SortBandsAction {
    type: 'SORT_BANDS'
    sortBy: keyof Band
}

interface FilterBandsAction {
    type: 'FILTER_BANDS'
    filter: string
}

type BandsAction = FetchBandsSuccessAction | SortBandsAction | FilterBandsAction

interface BandsState {
    untouchedBands: Array<Band>
    bands: Array<Band>
}

const initialState: BandsState = {
    bands: [],
    untouchedBands: [],
}

function bandsReducer(state: BandsState, action: BandsAction): BandsState {
    switch (action.type) {
        case 'FETCH_BANDS_SUCCESS': {
            return {
                ...state,
                bands: action.bands,
                untouchedBands: action.bands,
            }
        }

        case 'SORT_BANDS': {
            const sort = sortingReducers[action.sortBy]

            if (!sort) {
                return state
            }

            return {
                ...state,
                bands: sort(state.bands),
                untouchedBands: sort(state.untouchedBands),
            }
        }

        case 'FILTER_BANDS': {
            return {
                ...state,
                bands: state.untouchedBands.filter(band => band.name.includes(action.filter)),
            }
        }

        default: {
            return state
        }
    }
}

export function useBands(sortBy: keyof Band | undefined, filter: string | null) {
    const [{ bands }, dispatch] = useReducer(bandsReducer, initialState)
    const [bandsFetched, setBandsFetched] = useState(false)

    useEffect(() => {
        if (sortBy && bandsFetched) {
            dispatch({ type: 'SORT_BANDS', sortBy })
        }
    }, [sortBy, bandsFetched])

    useEffect(() => {
        if (filter !== null && bandsFetched) {
            dispatch({ type: 'FILTER_BANDS', filter })
        }
    }, [filter, bandsFetched])

    useEffect(() => {
        axios
            .get('https://dws-recruiting-bands.dwsbrazil.io/api/bands')
            .then(res => {
                dispatch({ type: 'FETCH_BANDS_SUCCESS', bands: res.data })
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
