import { ApolloClient, InMemoryCache } from "apollo-client";

import { GRAPH_API } from "../../secrets.json";
import { gql } from "@apollo/client";

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = process.env.API_URL || GRAPH_API;

const link = createHttpLink({
    fetch, // Switches between unfetch & node-fetch for client & server.
    uri: GRAPHQL_URL + "/graphql",
});

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});
client.query({});
