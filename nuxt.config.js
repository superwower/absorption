module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'absorption',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    'nuxt-buefy',
    '@nuxtjs/apollo'
  ],
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:3000/api/graphql',
        // wsEndpoint: 'ws://localhost:3000'
      }
    }
  },
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
