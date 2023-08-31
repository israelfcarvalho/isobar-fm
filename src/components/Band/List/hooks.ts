import { useEffect, useReducer, useState } from 'react'
import { Band } from '../../../types/entities/band'
import { useSearchParams } from 'react-router-dom'
import api from '../../../services/api'

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
                bands: state.untouchedBands.filter(band =>
                    band.name.toLocaleLowerCase().includes(action.filter.toLocaleLowerCase())
                ),
            }
        }

        default: {
            return state
        }
    }
}

export function useBands() {
    const [searchParams, setSearchParams] = useSearchParams()
    const filter = searchParams.get('bandFilter')
    const sortBy = searchParams.get('bandSort') as keyof Band

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
        api.get('bands')
            .then(res => {
                dispatch({ type: 'FETCH_BANDS_SUCCESS', bands: res.data })
            })
            .finally(() => {
                setBandsFetched(true)
            })
    }, [])

    useEffect(() => {
        setSearchParams(prevSearch => {
            prevSearch.set('bandResults', bands.length.toString())

            return prevSearch
        })
    }, [bands.length, setSearchParams])

    return {
        bands,
        bandsFetched,
    }
}
