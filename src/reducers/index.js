import { combineReducers } from "redux";

import {
  ADD_TO_FAVOURITES,
  ADD_MOVIES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
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

    default:
      return state;
  }
}

const initalSearchState = {
  result: {},
};
/* SEARCH REDUCER */
export function search(state = initalSearchState, action) {
  return state;
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
