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
import ArticlesPage from "./core/components/ArticlesPage";
import ArticleForm from "./core/components/ArticleForm";
import ArticlePage from "./core/components/ArticlePage";
import SearchResultsPage from "./core/components/SearchResultsPage";
import EditArticlePage from "./core/components/EditArticlePage";
import CreateArticlePage from "./core/components/CreateArticlePage";

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
                <Route path="/search/:query" component={SearchResultsPage} />
                <Route exact path="/articles" component={ArticlesPage} />
                <Route
                  exact
                  path="/articles/new"
                  component={CreateArticlePage}
                />
                <Route
                  path="/articles/:slug/edit"
                  component={EditArticlePage}
                />
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
