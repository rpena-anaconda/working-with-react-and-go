import React, { useState, useRef } from 'react';
import './EditMovie.css';


function EditMovie() {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const titleInputRef = useRef("");
    const releaseDateInputRef = useRef("");
    const runtimeInputRef = useRef("");
    const mpaaRatingInputRef = useRef("");
    const ratingInputRef = useRef("");
    const descriptionInputRef = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            title: titleInputRef.current.value,
            release_date: releaseDateInputRef.current.value,
            runtime: runtimeInputRef.current.value,
            mpaa_rating: mpaaRatingInputRef.current.value,
            rating: ratingInputRef.current.value,
            description: descriptionInputRef.current.value
        };

        console.log(newMovie)
    }

    return (
        <>
            <h2>Add/Edit Movie</h2>
            <hr />

            <form method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='title' className='form-label'>Title</label>
                    <input type='text' ref={titleInputRef} id='title' name="title" className='form-control' value={movie.title} />
                </div>

                <div className="mb-3">
                    <label htmlFor='release_date' className='form-label'>Release Date</label>
                    <input type='text' ref={releaseDateInputRef} id='release_date' name="release_date" className='form-control' value={movie.release_date} />
                </div>

                <div className="mb-3">
                    <label htmlFor='runtime' className='form-label'>Runtime</label>
                    <input type='text' ref={runtimeInputRef} id='runtime' name="runtime" className='form-control' value={movie.runtime} />
                </div>

                <div className="mb-3">
                    <label htmlFor='mpaa_rating' className='form-label'>MPAA Rating</label>
                    <select className='form-select' ref={mpaaRatingInputRef} value={movie.mpaa_rating}>
                        <option className='form-select' value='G'>G</option>
                        <option className='form-select' value='PG'>PG</option>
                        <option className='form-select' value='PG-13'>PG-13</option>
                        <option className='form-select' value='R'>R</option>
                        <option className='form-select' value='NC-17'>NC-17</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor='rating' className='form-label'>Rating</label>
                    <input type='text' ref={ratingInputRef} id='rating' name="rating" className='form-control' value={movie.rating} />
                </div>

                <div className="mb-3">
                    <label htmlFor='description' className='form-label'>Description</label>
                    <textarea id='description' ref={descriptionInputRef} name='description' rows='3' className='form-control'>{movie.description}</textarea>
                </div>

                <hr />

                <button className='btn btn-primary'>Save</button>
            </form>
        </>
    );
}

export default EditMovie;
