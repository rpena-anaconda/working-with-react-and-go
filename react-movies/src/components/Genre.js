import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Movie from './Movie'

function Genre() {
    const location = useLocation();
    const { genreName } = location;

    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true)

        fetch(`http://localhost:4000/v1/genre/${id}`)
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
    }, [])

    return (
        <>
            <h2>Genre: {genreName}</h2>
            {!movies &&
                <p>There are no movies associated to this genre.</p>
            }
            {movies && movies.map((movie) => (
                <Link key={movie.id} to={`/movies/${movie.id}`} className='list-group-item list-group-item-action'>
                    {movie.title}
                </Link>
                // <Movie key={movie.id} movie={movie} />
            ))}
        </>
    );
}

export default Genre;
