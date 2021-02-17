import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const prod = process.env.NODE_ENV === 'production';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'mo-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'mo-cache',
    errorPolicy: 'all',
  },
};

const cache = new InMemoryCache({
  resultCaching: false,
});

const link = createHttpLink({
  uri: `${
    prod
      ? 'https://wordpress-502086-1591393.cloudwaysapps.com'
      : 'https://wordpress-502086-1591393.cloudwaysapps.com'
  }/graphql`,
});

const client = new ApolloClient({
  link,
  cache,
  defaultOptions,
});

export default client;
