import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store, persistor } from "./redux/store/Store.ts";
import { Provider } from "react-redux";
import RoutesApp from "./routes/RoutesApp.tsx";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RoutesApp />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
