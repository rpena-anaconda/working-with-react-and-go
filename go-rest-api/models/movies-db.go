package models

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

func (m *DBModel) Get(id int) (*Movie, error) {
	println("we here with ", id)
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, title, description, year, release_date, rating, runtime, mpaa_rating,
				created_at, updated_at from movies where id = $1
	`
	row := m.DB.QueryRowContext(ctx, query, id)

	var movie Movie

	err := row.Scan(
		&movie.ID,
		&movie.Title,
		&movie.Description,
		&movie.Year,
		&movie.ReleaseDate,
		&movie.Rating,
		&movie.Runtime,
		&movie.MPAARating,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	query = `select
				mg.id, mg.movie_id, mg.genre_id, g.genre_name
			from
				movies_genres mg
				left join genres g on (g.id = mg.genre_id)
			where
				mg.movie_id = $1
	`
	rows, _ := m.DB.QueryContext(ctx, query, id)
	defer rows.Close()

	// var genres []MovieGenre
	genres := make(map[int]string)
	for rows.Next() {
		var mg MovieGenre
		err := rows.Scan(
			&mg.ID,
			&mg.MovieID,
			&mg.GenreID,
			&mg.Genre.GenreName,
		)

		if err != nil {
			return nil, err
		}

		// genres = append(genres, mg)
		genres[mg.ID] = mg.Genre.GenreName
	}

	// println(genres)
	movie.MovieGenre = genres

	return &movie, nil
}

func (m *DBModel) All(genre ...int) ([]*Movie, error) {
	ctx, cancel := context.WithTimeout(
		context.Background(),
		3*time.Second,
	)
	defer cancel()

	where := ""
	if len(genre) > 0 {
		where = fmt.Sprintf("where id in (select movie_id from movies_genres where genre_id = %d)", genre[0])
	}

	query := fmt.Sprintf(`select id, title, description, year, release_date, rating, runtime, mpaa_rating,
				created_at, updated_at from movies %s order by title
	`, where)

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movies []*Movie // pointer
	for rows.Next() {
		var movie Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.Description,
			&movie.Year,
			&movie.ReleaseDate,
			&movie.Rating,
			&movie.Runtime,
			&movie.MPAARating,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		// get genres, if any
		genreQuery := `select
				mg.id, mg.movie_id, mg.genre_id, g.genre_name
			from
				movies_genres mg
				left join genres g on (g.id = mg.genre_id)
			where
				mg.movie_id = $1
	`
		genreRows, _ := m.DB.QueryContext(ctx, genreQuery, movie.ID)
		// defer rows.Close()

		// var genres []MovieGenre
		genres := make(map[int]string)
		for genreRows.Next() {
			var mg MovieGenre
			err := genreRows.Scan(
				&mg.ID,
				&mg.MovieID,
				&mg.GenreID,
				&mg.Genre.GenreName,
			)

			if err != nil {
				return nil, err
			}

			// genres = append(genres, mg)
			genres[mg.ID] = mg.Genre.GenreName
		}
		genreRows.Close()

		movie.MovieGenre = genres
		movies = append(movies, &movie)
	}

	return movies, nil
}

func (m *DBModel) GenresAll() ([]*Genre, error) {
	ctx, cancel := context.WithTimeout(
		context.Background(),
		3*time.Second,
	)
	defer cancel()

	query := `select id, genre_name from genres order by genre_name`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var genres []*Genre
	for rows.Next() {
		var genre Genre
		err := rows.Scan(
			&genre.ID,
			&genre.GenreName,
		)

		if err != nil {
			return nil, err
		}

		genres = append(genres, &genre)
	}

	return genres, nil
}
