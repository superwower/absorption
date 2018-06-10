import { Router } from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

import Board from '../models/board'

const router = Router()

const root = {
  board: (args) => {
    return Board.findOne({id: args.id}).exec()
  },
  boards: () => {
    return Board.find().exec()
  }
}
router.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Query {
      board(id: String!): Board
      boards: [Board]
    },
    type Board {
      id: String,
      order: Int,
      title: String
    }
  `),
  rootValue: root,
  graphiql: true
}))

export default router
