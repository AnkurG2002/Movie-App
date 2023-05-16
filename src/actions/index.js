// action is a way of telling the store that i want to do something
// it is simply a javascript object

/* Pure Function 

    For a function to be a pure function, it has to satisfy 3 principles :
    1. for same input, output should always be same.
    2. function should only rely on the arguments provided to it, not on outside variables.
    3. it does not produce any observable side effects such as network request or data mutation

*/

// action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";
export const CLICK_OUTSIDE = "CLICK_OUTSIDE";

// action creaters
export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies,
  };
}
export function addToFavourites(movie) {
  return {
    type: ADD_TO_FAVOURITES,
    movie,
  };
}
export function removeFromFavourites(movie) {
  return {
    type: REMOVE_FROM_FAVOURITES,
    movie,
  };
}
export function setShowFavourites(val) {
  return {
    type: SET_SHOW_FAVOURITES,
    val,
  };
}
export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie,
  };
}
export function handleMovieSearch(searchText) {
  return async function (dispatch) {
    const url = `http://www.omdbapi.com/?apikey=3ca5df7&s=${searchText}`;

    const res = await fetch(url);
    const movies = await res.json();

    if (movies.Response) {
      dispatch(addMoviesSearchResult(movies.Search));
    }
  };
}
export function addMoviesSearchResult(movies) {
  return {
    type: ADD_SEARCH_RESULT,
    movies,
  };
}
export function clickOutside() {
  return {
    type: CLICK_OUTSIDE,
  };
}
