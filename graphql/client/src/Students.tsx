import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";

function Students() {
  const [students, setStudents] = useState([])
  const allStudents = gql`
    query {
      students {
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
      query: allStudents
    }).then(res => {
      setStudents(res.data.students)
    })
  }, [])

  return (
    <>
      <h1>all students</h1>
      <ul>
        {students.map((item) => {
          return <li key={item.id}>{JSON.stringify(item)}</li>
        })}
      </ul>
    </>
  )
}

export default Students
