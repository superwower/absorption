import express from 'express'
import session from 'express-session'
import consola from 'consola'
import { createServer } from 'http'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'

import api from './api'
import config from '../nuxt.config.js'
import server from './graphql'
import { init_db } from './lib/db'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)
server.applyMiddleware({ app })

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  init_db(config.dev)

  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)
  httpServer.listen(port, host, () => {
    consola.ready({
      message: `🚀 Server ready at http://localhost:${port}${
        server.graphqlPath
      }`,
      badge: true
    })
    consola.ready({
      message: `🚀 Subscriptions ready at ws://localhost:${port}${
        server.subscriptionsPath
      }`,
      badge: true
    })
  })
}

start()
