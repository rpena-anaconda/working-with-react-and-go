import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true)

        fetch("http://localhost:4000/v1/movies")
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
                    setMovies(json.movies);
                    setError(false);
                }
                setLoading(false)
            })
    }, []);

    if (loading && !error) {
        return <p>Loading Movies...</p>
    }

    if (!loading && error) {
        return <p>{errorMessage}</p>
    }

    return (
        <>
            <div>Choose a movie</div>

            {!loading && !error &&
                <div className="list-group">
                    {movies.map((movie) => (
                        <Link key={movie.id} className="list-group-item list-group-item-action" to={`/movies/${movie.id}`}>{movie.title}</Link>
                    ))}
                </div>
            }
        </>
    );
}

export default Movies;
