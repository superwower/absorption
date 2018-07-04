import { Router } from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import pubsub from '../lib/pubsub'

import Board from '../models/board'
import List from '../models/list'
import Card from '../models/card'

const router = Router()

const typeDefs = [`
type Query {
  board(id: String!): Board
  boards: [Board]
  list(id: String!): List
  lists(boardId: String): [List]
  card(id: String!): Card
  cards(boardId: String): [Card]
}
type Board {
  id: String,
  order: Int,
  title: String
}
type List {
  id: String,
  order: Int,
  boardId: String,
  title: String
}
type Card {
  id: String,
  order: Int,
  boardId: String,
  listId: String,
  content: String,
  like: [String],
  author: String
}
type Subscription {
  cardUpdated(boardId: String): Card
}
schema {
  query: Query
  subscription: Subscription
}`]

const resolvers = {
  Query: {
    board: (root, args) => {
      return Board.findOne({id: args.id}).exec()
    },
    boards: () => {
      return Board.find().exec()
    },
    list: (root, args) => {
      return List.findOne({id: args.id}).exec()
    },
    lists: (root, args) => {
      const query = {}
      if (args.boardId) {
        query.boardId = args.boardId
      }
      return List.find(query).exec()
    },
    card: (root, args) => {
      return Card.findOne({id: args.id}).exec()
    },
    cards: (root, args) => {
      const query = {}
      if (args.boardId) {
        query.boardId = args.boardId
      }
      return Card.find(query).exec()
    }
  },
  Subscription: {
    cardUpdated: {
      subscribe: () => pubsub.asyncIterator('cardUpdated')
    }
  }
}

export const schema = makeExecutableSchema({typeDefs, resolvers})

router.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
router.use('/graphiql', graphiqlExpress({endpointURL: '/api/graphql'}))

export default router
