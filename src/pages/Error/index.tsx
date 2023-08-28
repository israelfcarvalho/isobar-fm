import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const PageError: React.FC = () => {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        return (
            <section id="error-page">
                <h1>Oops!</h1>

                <p>Sorry, something went wrong!</p>

                <p>
                    <b>{error.statusText || error.data.message}</b>
                </p>
            </section>
        )
    }

    return <div>Opps!</div>
}

export default PageError
