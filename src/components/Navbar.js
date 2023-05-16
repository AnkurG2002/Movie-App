import React from "react";
import { connect } from "react-redux";
import { addMovieToList, handleMovieSearch } from "../actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleAddToMovies = async (movie) => {
    const url = `http://www.omdbapi.com/?apikey=3ca5df7&t=${movie.Title}`;
    await fetch(url)
      .then((response) => response.json())
      .then((movie) => this.props.dispatch(addMovieToList(movie)));
  };

  handleSearch = () => {
    const { searchText } = this.state;

    if (searchText.trim() !== "") {
      this.props.dispatch(handleMovieSearch(searchText));
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { result = [], showSearchResults } = this.props.search;

    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} onKeyDown={this.handleKeyPress} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              {result.length === 0 ? (
                <div className="no-result">Movie Not Found</div>
              ) : (
                result.map((movie, index) => (
                  <div className="search-result" key={`movie-${index}`}>
                    <img src={movie.Poster} alt="search-pic" />

                    <div className="movie-info">
                      <span>{movie.Title}</span>
                      <button onClick={() => this.handleAddToMovies(movie)}>
                        Add to Movies
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => (
//           <Navbar dispatch={store.dispatch} search={this.props.search} />
//         )}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

const ConnectedNavBarComponent = connect(mapStateToProps)(Navbar);
export default ConnectedNavBarComponent;
