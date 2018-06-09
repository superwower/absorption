import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import session from 'express-session'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {Mockgoose} from 'mockgoose'

import api from './api'
import config from '../nuxt.config.js'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)
const mockgoose = new Mockgoose(mongoose)

const proxy = process.env.http_proxy
if (proxy) {
  mockgoose.helper.setProxy(proxy)
}

import Board from './models/board'
import Card from './models/card'
import List from './models/list'

mockgoose.prepareStorage()
  .then(() => {
    mongoose.connect('mongodb://foobar/baz')
    mongoose.connection.on('connected', () => {
      Board.create([
        { id: '1', order: 1, title: 'retrospective' }
      ])
        .then(Card.create([
          { id: '1', order: 1, boardId: '1', listId: '1', content: '1st keep item', like: ['demo'], author: 'demo' },
          { id: '2', order: 2, boardId: '1', listId: '1', content: '2nd keep item', like: [], author: 'test' },
          { id: '3', order: 3, boardId: '1', listId: '2', content: '1st problem item', like: ['demo'], author: 'test' },
          { id: '4', order: 2, boardId: '1', listId: '2', content: '2nd problem item', like: ['demo'], author: 'demo' },
          { id: '5', order: 1, boardId: '1', listId: '2', content: '3rd problem item', like: [], author: 'sample' },
          { id: '6', order: 2, boardId: '1', listId: '3', content: '1st try item', like: [], author: 'sample' },
          { id: '7', order: 1, boardId: '1', listId: '3', content: '2nd try item', like: [], author: 'demo' }
        ]))
        .then(List.create([
          { id: '1', order: 1, boardId: '1', title: 'keep' },
          { id: '2', order: 2, boardId: '1', title: 'problem' },
          { id: '3', order: 3, boardId: '1', title: 'try' }
        ]))
        .then(() => {
        // Listen the server
          app.listen(port, host)
          console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
        })
    })
  })
