import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Movies from './components/Movies'
import Admin from './components/Admin'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails';
import Genres from './components/Genres';
import Genre from './components/Genre'
import EditMovie from './components/EditMovie';
// import Categories from './components/Categories';
// import CategoryPage from './components/CategoryPage';

export default function App() {
    return (
        <Router>
            <div className="container">

                <div className="row">
                    <h1 className="mt-3">
                        Go Watch a Movie!
                    </h1>
                    <hr className="mb-3"></hr>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <nav>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/movies">Movies</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/genres">Genres</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/admin/add">Add Movie</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/admin">Manage Catalogue</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-md-10">
                        <Switch>
                            {/* 
                                <Route path="/movies/:id">
                                    <MovieDetails />
                                </Route> 
                            */}
                            <Route path="/movies/:id" component={MovieDetails}></Route>

                            <Route path="/movies">
                                <Movies />
                            </Route>

                            <Route path="/genre/:id" component={Genre}></Route>

                            <Route exact path="/genres">
                                <Genres />
                            </Route>

                            {/* <Route
                                exact
                                path="/by-category/drama"
                                render={(props) => <Categories {...props} title={`Drama`} />}
                            />

                            <Route
                                exact
                                path="/by-category/comedy"
                                render={(props) => <Categories {...props} title={`Comedy`} />}
                            /> */}

                            <Route path="/admin/add" component={EditMovie} />

                            <Route path="/admin">
                                <Admin />
                            </Route>

                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

// function Home() {
//     return <h2>Home</h2>
// }

// function Movies() {
//   return <h2>Movies</h2>
// }

// function Admin() {
//     return <h2>Manage Catalogue</h2>
// }
