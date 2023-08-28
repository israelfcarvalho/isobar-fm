import Icon from '../Icon'
import SearchBar from '../SearchBar'

const Header: React.FC = () => {
    const handleSearch = (search: string) => {
        console.log({ search })
    }

    return (
        <header>
            <Icon
                icon="chevron_left"
                type="button"
                ariaLabel="Go back"
                onClick={() => {
                    console.log('Go back')
                }}
            />

            <SearchBar label="Search Band" onSearch={handleSearch}></SearchBar>
            <h1>isobar.fm</h1>
        </header>
    )
}

export default Header
