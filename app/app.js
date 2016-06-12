// Node.js modules and those from npm
// are required the same way as always.
// const app = require('remote').require('app')
// const jetpack = require('fs-jetpack').cwd(app.getAppPath())
const Vue = require('vue')
const VueRouter = require('vue-router')
const vmdl = require('vue-mdl')
const games = require('./components/Games.vue')
const welcome = require('./components/Welcome.vue')
const reader = require('./components/Reader.vue')
const writer = require('./components/Writer.vue')

vmdl.default.registerAll(Vue)

Vue.use(VueRouter)

var router = new VueRouter()
router.map({
  '/games': {
    component: games
  },
  '/reader': {
    component: reader
  },
  '/writer': {
    component: writer
  },
  '/welcome': {
    component: welcome
  }
})

var App = Vue.extend({})
console.log('starting')

router.start(App, '#app')
router.go('/welcome')
