import { Band } from '../../../types/entities/band'

interface BandCardProps {
    band: Band
}

const BandCard: React.FC<BandCardProps> = ({ band }) => {
    return (
        <section>
            <img src={band.image} alt={band.name} />
            <h1>{band.name}</h1>
            <p>{band.numPlays} Plays</p>
        </section>
    )
}

export default BandCard
