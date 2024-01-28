import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";

function Student() {
  const [student, setStudent] = useState(null)
  const someOne = gql`
    query getSomeOne($studentId: ID!){
      student(id: $studentId) {
        id
        address
      }
    }
  `
  const client = new ApolloClient({
    uri: 'http://localhost:3002/',
    cache: new InMemoryCache(),
  })

  useEffect(() => {
    client.query({
      query: someOne,
      variables: {"studentId": 1}
    }).then(res => {
      console.log(res)
      setStudent(res.data.student)
    })
  }, [])

  return (
    <>
      <h1>someone student</h1>
      <ul>
        {JSON.stringify(student)}
      </ul>
    </>
  )
}

export default Student
