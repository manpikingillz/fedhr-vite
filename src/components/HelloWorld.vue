<script>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'

const EMPLOYEES_QUERY = gql`
  query Employees {
    allEmployees {
      firstName
      lastName
    }
  }
`

export default {
  name: 'HelloWorld',
  setup () {
    const { result, loading, error } = useQuery(EMPLOYEES_QUERY);

    return {
      result,
      loading,
      error
    }
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p v-else v-for="(employee, index) in result.allEmployees" :key="index">
    {{ employee }}
  </p>
  {{ result }}
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
