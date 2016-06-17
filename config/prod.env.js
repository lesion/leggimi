var git = require('git-rev-sync')

module.exports = {
  NODE_ENV: '"production"',
  RELEASE: '"' + git.branch() + '"'
}
