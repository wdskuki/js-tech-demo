const { ApolloServer, gql } = require('apollo-server')
const util = require('node:util');

const db = require('./db')
const port = 3002

db.connect()

// 构造schema
const typeDefs = gql`
  type Query {
    students: [Student]
    student(id: ID!): Student
  }

  type Student {
    id: ID
    name: String
    age: Int
    gender: Int
    intro: String
    phone: String
    address: String
  }
`

db.query = util.promisify(db.query)
// 定义resolver
const resolvers = {
  Query: {
    students: async () => {
      const list = await db.query('SELECT * FROM t_students')
      console.log(list)
      return list
    },
    // student: async (root, args) => {
    //   console.log(root, args)
    //   const id = args.id
    //   const list = await db.query(`SELECT * FROM t_students WHERE ID=${id}`)
    //   console.log('someone')
    //   return list[0]
    // }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({port}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});