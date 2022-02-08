package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getAllMoviesByGenre(
	w http.ResponseWriter, r *http.Request,
) {
	params := httprouter.ParamsFromContext(r.Context())

	genre_id, err := strconv.Atoi(params.ByName("genre_id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	movies, err := app.models.DB.All(genre_id)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllGenres(
	w http.ResponseWriter, r *http.Request,
) {
	genres, err := app.models.DB.GenresAll()
	if err != nil {
		app.logger.Println(err)
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, genres, "genres")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}
