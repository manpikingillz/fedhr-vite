import { createApp, provide, h  } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import App from './App.vue'

const cache = new InMemoryCache()

const httpLink = createHttpLink({uri:  'http://localhost:8000/graphql' })

const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
})

const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
  })

app.mount('#app')
