import { combineReducers } from "redux";

import {
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_MOVIE_TO_LIST,
  ADD_SEARCH_RESULT,
  CLICK_OUTSIDE,
} from "../actions";

const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false,
};
/* MOVIES REDUCER */
export function movies(state = initialMoviesState, action) {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };

    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };

    case REMOVE_FROM_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };
    default:
      return state;
  }
}

const initalSearchState = {
  result: [],
  showSearchResults: false,
};
/* SEARCH REDUCER */
export function search(state = initalSearchState, action) {
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movies,
        showSearchResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults: false,
      };
    case CLICK_OUTSIDE:
      return {
        ...state,
        showSearchResults: false,
      };
    default:
      return state;
  }
}

// const initalRootState = {
//   movies: initialMoviesState,
//   search: initalSearchState,
// };
// /* ROOT REDUCER */
// export function rootReducer(state = initalRootState, action) {
//   return {
//     movies: movies(state.movies, action),
//     search: search(state.search, action),
//   };
// }

// Instead of creating a root reducer ourselves (like above), we can use inbuilt function of redux
export default combineReducers({
  movies,
  search,
});
