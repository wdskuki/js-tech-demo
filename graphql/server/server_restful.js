const express = require('express')
const app = express()
const db = require('./db')
const port = 3001


db.connect()

app.get('/students', (req, res) => {
  db.query('SELECT * FROM t_students', (err, rows, fields) => {
    if (err) throw err;
    res.send(rows)
  });
})

app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id)
  db.query(`SELECT * FROM t_students WHERE id=${id}`, (err, rows, fields) => {
    if(err) throw err;
    res.send(rows)
  })
})

app.get('/students/name', (req, res) => {
  db.query('SELECT name FROM t_students', (err, rows, fields) => {
    if (err) throw err;
    res.send(rows)
  });
})

app.get('/students/nameAge', (req, res) => {
  db.query('SELECT name, age FROM t_students', (err, rows, fields) => {
    if (err) throw err;
    res.send(rows)
  });
})

app.get('/students/nameAgePhone', (req, res) => {
  db.query('SELECT name, age, phone FROM t_students', (err, rows, fields) => {
    if (err) throw err;
    res.send(rows)
  });
})


// app.get('/teachers', async (req, res) => {
//   db.query('SELECT * FROM t_teachers', (err, rows, fields) => {
//     if (err) throw err;
//     res.send(rows)
//   });
// })

// app.get('/teachers/:id', (req, res) => {
//   const id = Number(req.params.id)
//   db.query(`SELECT * FROM t_teachers WHERE id=${id}`, (err, rows, fields) => {
//     if(err) throw err;
//     res.send(rows)
//   })
// })

// app.get('/teacher/:teacherId/students', (req, res) => {
//   const teacherId = Number(req.params.teacherId)
//   db.query(`SELECT * FROM t_students WHERE teacher_id=${teacherId}`, (err, rows, fields) => {
//     if(err) throw err;
//     res.send(rows)
//   })
// })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// var express = require("express")
// var { graphqlHTTP } = require("express-graphql")
// var { buildSchema } = require("graphql")

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return "Hello world!"
//   },
// }

// var app = express()
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   })
// )
// app.listen(4000)
// console.log("Running a GraphQL API server at http://localhost:4000/graphql")