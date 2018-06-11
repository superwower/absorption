import { Router } from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

import Board from '../models/board'
import List from '../models/list'
import Card from '../models/card'

const router = Router()

const root = {
  board: (args) => {
    return Board.findOne({id: args.id}).exec()
  },
  boards: () => {
    return Board.find().exec()
  },
  list: (args) => {
    return List.findOne({id: args.id}).exec()
  },
  lists: (args) => {
    const query = {}
    if (args.boardId) {
      query.boardId = args.boardId
    }
    return List.find(query).exec()
  },
  card: (args) => {
    return Card.findOne({id: args.id}).exec()
  },
  cards: (args) => {
    const query = {}
    if (args.boardId) {
      query.boardId = args.boardId
    }
    return Card.find(query).exec()
  }
}
router.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Query {
      board(id: String!): Board
      boards: [Board]
      list(id: String!): List
      lists(boardId: String): [List]
      card(id: String!): Card
      cards(boardId: String): [Card]
    },
    type Board {
      id: String,
      order: Int,
      title: String
    },
    type List {
      id: String,
      order: Int,
      boardId: String,
      title: String
    },
    type Card {
      id: String,
      order: Int,
      boardId: String,
      listId: String,
      content: String,
      like: [String],
      author: String
    }
  `),
  rootValue: root,
  graphiql: true
}))

export default router
