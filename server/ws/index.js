import express from 'express'
import expressWs from 'express-ws'
const app = express()
expressWs(app)

const router = express.Router()

router.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg)
    ws.send(msg);
  });
});

export default router
