import React, { useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function OneMovie() {
    const { id } = useParams();
    return (
        <>
            <h2>{id}</h2>
            {/* <h2>Movie: {this.state.movie.title} {this.state.movie.id}</h2> */}

            {/* <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                    <tr>
                        <td><strong>Title:</strong></td>
                        <td>{this.state.movie.title}</td>
                    </tr>
                    <tr>
                        <td><strong>Run time:</strong></td>
                        <td>{this.state.movie.runtime} minutes</td>
                    </tr>
                </tbody>
            </table> */}
        </>
    );
}

export default OneMovie;
