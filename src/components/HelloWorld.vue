<script setup>
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'

const EMPLOYEES_QUERY = gql`
  query Employees {
    allEmployees {
      firstName
      middleName
      lastName
    }
  }
`
    const { result, loading, error, refetch } = useQuery(EMPLOYEES_QUERY);

    const CREATE_EMPLOYEE = gql`
      mutation createEmployeeMutation (
      $firstName: String!,
      $middleName: String,
      $lastName: String!) {
        createEmployee (firstName: $firstName, middleName: $middleName, lastName: $lastName) {
          employee {
            firstName,
            middleName,
            lastName
          }
        }
      }`;

   const { mutate: createEmployee, onDone, onError } = useMutation(CREATE_EMPLOYEE, () => ({
        variables: {
          firstName: 'Rosette 6',
          middleName: 'Rossie 6',
          lastName: 'Katusiime 6'
        },
        optimisticResponse: {
          createEmployee: {
            employee: {
              firstName: 'Rosette 6',
              middleName: 'Rossie 6',
              lastName: 'Katusiime 6'
            }
          }
        },
        update: (cache, { data }) => {
          const newDataFromResponse = data?.createEmployee?.employee
          let employeesDataInCache = cache.readQuery({query: EMPLOYEES_QUERY})

          let newCacheData = {
            allEmployees: [
              ...employeesDataInCache.allEmployees,
              newDataFromResponse
            ],
          }
          console.log('ALL: ', newCacheData)
          cache.writeQuery({query: EMPLOYEES_QUERY, data: newCacheData})
        }
      })
    );

    onDone(()=> {
      refetch();
        console.log('Finishedddd!!')
      })

    onError(()=> {
        console.log('Errrorrr!!')
      })
</script>

<template>
  <h1>{{ msg }}</h1>

  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>
  <p v-if="!result">No data</p>
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
