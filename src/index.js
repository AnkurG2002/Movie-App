import React from "react";
import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

// logger(obj)(next)(action)
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // middleware code
    if (typeof action !== "function")
      console.log("ACTION_TYPE = ", action.type);
    next(action);
  };

/* We'll use redux inbuilt thunk middleware instead of above  */

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       return action(dispatch);
//     }
//     next(action);
//   };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

/* WE CAN PERFORM THE BELOW FUNCTIONS THROUGH REACT-REDUX PACKAGE */

// export const StoreContext = createContext();

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

// export function connect(callback) {
//   return function (Component) {
//     class ConnectedAppComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }

//       componentWillUnmount() {
//         this.unsubscribe();
//       }

//       render() {
//         const { store } = this.props;
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//           <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//         );
//       }
//     }

//     class ConnectedAppComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => <ConnectedAppComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }

//     return ConnectedAppComponentWrapper;
//   };
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
