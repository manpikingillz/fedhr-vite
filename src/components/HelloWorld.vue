<script setup>
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'

const EMPLOYEES_QUERY = gql`
  query Employees {
    allEmployees {
      firstName
      lastName
    }
  }
`
    const { result, loading, error } = useQuery(EMPLOYEES_QUERY);

    const CREATE_EMPLOYEE = gql`
      mutation createEmployeeMutation (
      $firstName: String!,
      $middleName: String!,
      $lastName: String!) {
        createEmployee (firstName: $firstName, middleName: $middleName, lastName: $lastName) {
          employee {
            firstName,
            lastName
          }
        }
      }`;

   const { mutate: createEmployee } = useMutation(CREATE_EMPLOYEE, () => ({
        variables: {
          firstName: 'GIlbetttoooo',
          middleName: 'Gabriellll11111',
          lastName: 'Twesigommweee'
        },
      })
    );
</script>

<template>
  <h1>{{ msg }}</h1>

  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p v-else v-for="(employee, index) in result.allEmployees" :key="index">
    {{ employee }}
  </p>
  {{ result }}
  <button @click="createEmployee(); methodName()">Post</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
