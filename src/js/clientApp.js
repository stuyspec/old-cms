import Provider from "react-redux/lib/components/Provider";
import store from "./store";
import { ApolloProvider } from "react-apollo";
import client from "./modules/apolloClient";
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { RoutingApp } from "./modules";
import { AppContainer } from "react-hot-loader";
import injectTapEventPlugin from "react-tap-event-plugin";

// for onClick events with MUI/React
try {
  injectTapEventPlugin();
} catch (err) {
  /* hot reloading, no issue  */
}

import { VERSION } from "./versionInfo";

console.log("appVersion ->", VERSION);

ReactDOM.render(
  <AppContainer>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RoutingApp />
      </Provider>
    </ApolloProvider>
  </AppContainer>,
  document.getElementById("app")
);
