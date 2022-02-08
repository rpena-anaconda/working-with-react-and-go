import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Genres() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true)

        fetch("http://localhost:4000/v1/genres")
            .then((response) => {
                if (response.status !== 200) {
                    setError(true);
                    setErrorMessage(`Invalid response code: ${response.status}`);
                    return;
                }

                return response.json()
            })
            .then((json) => {
                if (json) {
                    setGenres(json.genres);
                    setError(false);
                }
                setLoading(false)
            })
    }, [])

    if (loading && !error) {
        return <p>Loading Movies...</p>
    }

    if (!loading && error) {
        return <p>{errorMessage}</p>
    }

    return (
        <>
            <h2>Genres</h2>
            <div className="list-group">
                {genres.map((m) => (
                    <Link key={m.id} className="list-group-item list-group-item-action" to={{
                        pathname: `/genre/${m.id}`,
                        genreName: m.genre_name,
                    }}>
                        {m.genre_name}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Genres;
