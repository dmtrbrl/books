module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Books',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Disable progress bar
  */
  loading: false,


  modules: ['@nuxtjs/apollo', ['nuxt-sass-resources-loader', ['~scss/colors.scss', '~scss/media-queries.scss']]],

  apollo: {
    clientConfigs: {
        default: "~/apollo/client-configs/default.js"
    }
  },

  css : [
    '~scss/global.scss'
  ],


  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
