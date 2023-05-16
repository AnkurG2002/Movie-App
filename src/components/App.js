import React from "react";
import { connect } from "react-redux";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, clickOutside, setShowFavourites } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    // dispatch action
    this.props.dispatch(addMovies(data));
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /* Alert if clicked on outside of element */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.dispatch(clickOutside());
    }
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    return index !== -1;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    /*
      root = {
        movies: { list: [], favourites: [], showfavourites: bool }
        search: { result: [], showSearchResults: bool,}
      }
    */

    const { list, favourites = [], showFavourites = [] } = this.props.movies;
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <div ref={this.wrapperRef}>
          <Navbar />
        </div>

        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
            {displayMovies.length === 0 && (
              <div className="no-movies"> No Movies to Show </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

const ConnectedAppComponent = connect(mapStateToProps)(App);
export default ConnectedAppComponent;
