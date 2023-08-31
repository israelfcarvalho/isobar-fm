import { Band } from './band'

export interface Track {
    id: string
    name: string
    duration: string
}

export interface Album {
    id: string
    name: string
    releaseDate: string
    image: string
    band: Band
    tracks: Array<Track>
}
