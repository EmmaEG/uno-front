import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store/Store.ts";
import { Provider } from "react-redux";
import RoutesApp from "./routes/RoutesApp.tsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RoutesApp />
      </Router>
    </Provider>
  </React.StrictMode>
);
