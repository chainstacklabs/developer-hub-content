import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";
// For simple example we don't need cache
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
const uriQuery = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"; // the api url from the graph studio
export const apolloClient = new ApolloClient({
  uri: uriQuery,
  cache: new InMemoryCache(),
  defaultOptions,
});