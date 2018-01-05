import Provider from "react-redux/lib/components/Provider";
import React, { Component } from "react";
import Route from "react-router-dom/Route";
import appHistory from "tools/appHistory";
import MainApp from "./core/components/MainApp";
import SignUpPage from "./core/components/SignUpPage";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import store from "../store";
import { ApolloProvider } from "react-apollo";
import { Switch } from "react-router-dom";
import SectionPage from "./core/components/SectionPage";
import ArticlesPage from "./core/components/ArticlesPage";
import ArticlePage from "./core/components/ArticlePage";
import SearchResultsPage from "./core/components/SearchResultsPage";
import EditArticlePage from "./core/components/EditArticlePage";
import CreateArticlePage from "./core/components/CreateArticlePage";
import CreateSectionPage from './core/components/CreateSectionPage'
import client from "./apolloClient"
import UserPage from './core/components/UserPage'
import HomePage from './HomePage'
import SignInPage from './core/components/SignInPage'



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
                <Route exact path="/sections/new" component={CreateSectionPage} />
                <Route path="/sections" component={SectionPage} />
                <Route exact path="/users/sign_up" component={SignUpPage} />
                <Route exact path="/users/sign_in" component={SignInPage} />
                <Route path="/users/:slug" component={UserPage} />
                <Route exact path="/" component={HomePage} />
              </Switch>
            </MainApp>
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default RoutingApp;
