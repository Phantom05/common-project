import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "store/modules";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";

const store = createStore(rootReducer);

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default Root;
