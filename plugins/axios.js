import * as axios from 'axios'

let options = {
  proxy: false
}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `${process.env.PROTO || 'http'}://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

export default axios.create(options)
