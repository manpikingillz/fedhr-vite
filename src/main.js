import { createApp, provide, h  } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import App from './App.vue'

const httpLink = createHttpLink({uri:  'http://localhost:8000/graphql' })

//Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(process.env.NODE_ENV !== 'production') {
    if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

    if (networkError) console.log(`[Network error]: ${networkError}`)
  }
})

const cache = new InMemoryCache()



const apolloClient = new ApolloClient({
  cache,
  link: errorLink.concat(httpLink),
  connectToDevTools: true,
})

const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
  })

app.mount('#app')
