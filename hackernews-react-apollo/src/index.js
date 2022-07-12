import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
//configure ApolloClient instance to know endpoint of GraphQL API and deal with network requests
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

//configure ApolloClient instance to know endpoint of GraphQL API and deal with network requests
//create httpLink to connect ApolloClient instance with graphql API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

//instantiate ApolloClient by passing in the httpLink a new instance of InMemoryCache
const client = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache()
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //wrap app with ApolloProvider and pass client as prop
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
