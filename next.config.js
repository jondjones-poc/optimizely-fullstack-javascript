const path = require('path')
const withSass = require('@zeit/next-sass');
const withOptimizely = require('./utils/optimizelyDataFileHandlerServerSide')

module.exports = withSass({
  cssModules: true,
  reactStrictMode: true,
  distDir: 'build',
})

module.exports = {
  sassOptions: {
   includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['localhost', 'optimizely-fullstack-javascript.netlify.app'],
    path: 'https://optimizely-fullstack-javascript.netlify.app/',
  },
}

module.exports = withOptimizely({
    reactStrictMode: false,
})