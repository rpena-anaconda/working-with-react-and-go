import React, { useState, useRef, useEffect } from 'react';
import './EditMovie.css';
import Input from './form-components/Input'
import Textarea from './form-components/Textarea'
import Select from './form-components/Select'
import { useParams } from 'react-router-dom';


function EditMovie() {
    const { id } = useParams();
    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        rating: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const mpaaRating = [
        { id: "G", value: "G" },
        { id: "PG", value: "PG" },
        { id: "PG13", value: "PG13" },
        { id: "R", value: "R" },
        { id: "NC17", value: "NC17" },
    ];

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`http://localhost:4000/v1/movie/${id}`)
                .then((response) => {
                    if (response.status !== 200) {
                        let err = Error;
                        err.Message = `Invalid response code: ${response.status}`;
                        setError(err);
                    }

                    return response.json();
                })
                .then((json) => {
                    if (json && json.movie !== null) {
                        const releaseDate = new Date(json.movie.release_date);
                        const updatedMovie = {
                            ...json.movie,
                            release_date: releaseDate.toISOString().split("T")[0]
                        }
                        debugger;
                        setMovie(updatedMovie);
                    }
                    setLoading(false);
                })
                .catch((err) => {

                    debugger;
                    setError(err);
                    setLoading(false);
                })
        }

    }, [setMovie]);

    const handleChange = () => (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setMovie({
            ...movie,
            [name]: value
        });
        debugger;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('values of new movie', movie)
    }

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <h2>Add/Edit Movie</h2>
                <hr />

                <form method="post" onSubmit={handleSubmit}>
                    {movie && <input type="hidden" name="id" id="id" value={movie.id} />}

                    <Input
                        title={"Title"}
                        type={"text"}
                        name={"title"}
                        value={movie.title}
                        handleChange={handleChange("title")}
                    />

                    {/* <div className="mb-3">
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input type='text' ref={titleInputRef} id='title' name="title" className='form-control' value={movie.title} />
                    </div> */}

                    <Input
                        title={"Release Date"}
                        type={"date"}
                        name={"release_date"}
                        value={movie.release_date}
                        handleChange={handleChange("release_date")}
                    />

                    {/* <div className="mb-3">
                        <label htmlFor='release_date' className='form-label'>Release Date</label>
                        <input type='text' ref={releaseDateInputRef} id='release_date' name="release_date" className='form-control' value={movie.release_date} />
                    </div> */}

                    <Input
                        title={"Runtime"}
                        type={"text"}
                        name={"runtime"}
                        value={movie.runtime}
                        handleChange={handleChange("runtime")}
                    />


                    {/* <div className="mb-3">
                        <label htmlFor='runtime' className='form-label'>Runtime</label>
                        <input type='text' ref={runtimeInputRef} id='runtime' name="runtime" className='form-control' value={movie.runtime} />
                    </div> */}

                    <Select
                        title={'MPAA Rating'}
                        name={'mpaa_rating'}
                        options={mpaaRating}
                        value={movie.mpaa_rating}
                        handleChange={handleChange("mpaa_rating")}
                        placeholder={'Choose...'}
                    />

                    {/* <div className="mb-3">
                        <label htmlFor='mpaa_rating' className='form-label'>MPAA Rating</label>
                        <select className='form-select' ref={mpaaRatingInputRef} value={movie.mpaa_rating}>
                            <option className='form-select' value='G'>G</option>
                            <option className='form-select' value='PG'>PG</option>
                            <option className='form-select' value='PG-13'>PG-13</option>
                            <option className='form-select' value='R'>R</option>
                            <option className='form-select' value='NC-17'>NC-17</option>
                        </select>
                    </div> */}

                    <Input
                        title={"Rating"}
                        type={"text"}
                        name={"rating"}
                        value={movie.rating}
                        handleChange={handleChange("rating")}
                    />


                    {/* <div className="mb-3">
                        <label htmlFor='rating' className='form-label'>Rating</label>
                        <input type='text' ref={ratingInputRef} id='rating' name="rating" className='form-control' value={movie.rating} />
                    </div> */}

                    <Textarea
                        title={"Description"}
                        name={"description"}
                        value={movie.description}
                        rows={"3"}
                        handleChange={handleChange("description")}
                    />

                    {/* <div className="mb-3">
                        <label htmlFor='description' className='form-label'>Description</label>
                        <textarea id='description' ref={descriptionInputRef} name='description' rows='3' className='form-control'>{movie.description}</textarea>
                    </div> */}

                    <hr />

                    <button className='btn btn-primary'>Save</button>
                </form>

                <div className="mt-3">
                    <pre>{JSON.stringify(movie)}</pre>
                </div>
            </>
        );
    }
}

export default EditMovie;
