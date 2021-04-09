import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bundles from "./Bundles/Bundles";
import Header from "./Header";
import Home from "./Dashboard/Home";
import Logs from "./Logs/Logs";
import Events from "./Events/Events";
import NotFound from "./NotFound";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";
import connectToStomp from "../StompClient";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@material-ui/core";

export const theme = {
  ...createMuiTheme(),
  alarm: "#cc0000",
  warning: "#ffcc00",
};

const composed = compose(applyMiddleware(thunkMiddleware));

const persistConfig = {
  key: "preferences",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composed);
export const persistedStore = persistStore(store);

connectToStomp();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistedStore}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/logs" exact component={Logs} />
              <Route path="/bundles" exact component={Bundles} />
              <Route path="/events" exact component={Events} />
              <Route component={NotFound} />
            </Switch>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
