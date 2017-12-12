import Provider from "react-redux/lib/components/Provider";
import React, { Component } from "react";
import Route from "react-router-dom/Route";
import appHistory from "tools/appHistory";
import MainApp from "./core/components/MainApp";
import SignUpPage from "./core/components/SignUpPage";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import store from "../store";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";
import { Switch } from "react-router-dom";
import SectionPage from "./core/components/SectionPage";
import ArticlesList from "./core/components/ArticlesList";
import ArticleForm from "./core/components/ArticleForm";
import ArticlePage from './core/components/ArticlePage'

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
  cache: new InMemoryCache()
});
class RoutingApp extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedRouter history={appHistory}>
            <MainApp>
              <Switch>
                <Route path="/articles/edit/:id" component={ArticleForm} />
                <Route exact path="/articles" component={ArticlesList} />
                <Route path="/articles/:slug" component={ArticlePage} />
                <Route path="/sections" component={SectionPage} />
                <Route exact path="/sign_up" component={SignUpPage} />
              </Switch>
            </MainApp>
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default RoutingApp;
