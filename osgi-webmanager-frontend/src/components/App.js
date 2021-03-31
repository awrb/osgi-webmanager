import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bundles from "./Bundles/Bundles";
import Header from "./Header";
import Home from "./Dashboard/Home";
import Logs from "./Logs/Logs";
import Events from "./Events";
import NotFound from "./NotFound";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";
import connectToStomp from "../StompClient";

const theme = {
  ...createMuiTheme(),
  alarm: "#cc0000",
};

const composed = compose(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, composed);

connectToStomp();

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
