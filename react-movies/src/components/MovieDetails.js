import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Movies from './Movies';
import Movie from './Movie';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    // const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:4000/v1/movie/${id}`)
            .then((response) => response.json())
            .then((json) => {
                setMovie(json.movie)

                // if (json.movie.genres) {
                //     setGenres(Object.values(json.movie.genres));
                // } else {
                //     setGenres([]);
                // }

                setLoading(false)
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Movie movie={movie} />
        </>
    );
}

export default MovieDetails;
