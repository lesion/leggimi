var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var git = require('git-rev-sync')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RELEASE: '"' + git.branch() + '.dev"'
})