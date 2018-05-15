import * as axios from 'axios'

let options = {
  proxy: false
}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 3000}`
}

export default axios.create(options)
