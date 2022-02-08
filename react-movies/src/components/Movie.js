import React from 'react';

function Movie({ movie }) {
    const genres = Object.values(movie.genres);

    return (
        <>
            <h2>
                Movie: {movie.title} ({movie.year})
            </h2>

            <div className="float-start">
                <small>Rating: {movie.mpaa_rating}</small>
            </div>
            <div className="float-end">
                {genres.map((m, index) => (
                    <span className="badge bg-secondary me-1" key={index}>
                        {m}
                    </span>
                ))}
            </div>

            <div className="clearfix"></div>

            <hr />

            <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Title:</strong>
                        </td>
                        <td>{movie.title}</td>
                    </tr>
                    <tr>
                        <td><strong>Description:</strong></td>
                        <td>{movie.description}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Run time:</strong>
                        </td>
                        <td>{movie.runtime} minutes</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Movie;
