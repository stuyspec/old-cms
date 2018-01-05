import { ApolloClient, InMemoryCache } from "apollo-client-preset";
import { ApolloLink, concat } from 'apollo-link';
import { HttpLink } from "apollo-link-http"
import { SPEC_API_URL } from './core/constants'

const httpLink = new HttpLink({ uri: `${SPEC_API_URL}/graphql` });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      token: localStorage.getItem('token') || null,
      client: localStorage.getItem('client') || null,
      uid: localStorage.getItem('uid') || null,
      expiry: localStorage.getItem('expiry') || null,
    }
  });

  return forward(operation);
})

const addToken = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const { headers } = operation.getContext();
    if (headers.client) {
      localStorage.setItem("client", headers.client);
    }
    if (headers.token) {
      localStorage.setItem("token", headers.token);
    }
    if (headers.expiry) {
      localStorage.setItem("expiry", headers.expiry);
    }
    if (headers.uid) {
      localStorage.setItem("uid", headers.uid);
    }
    return response;
  })
})

const client = new ApolloClient({
  link: addToken.concat(concat(authMiddleware, httpLink)),
  cache: new InMemoryCache()
});

export default client;

