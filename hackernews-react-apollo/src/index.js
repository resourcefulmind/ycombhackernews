import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
//configure ApolloClient instance to know endpoint of GraphQL API and deal with network requests
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context';

//configure ApolloClient instance to know endpoint of GraphQL API and deal with network requests
//create httpLink to connect ApolloClient instance with graphql API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : ''
    }
  };
})

//instantiate ApolloClient by passing in the httpLink a new instance of InMemoryCache
const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache()
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* wrap app with ApolloProvider and pass client as prop */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
