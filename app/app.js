// Node.js modules and those from npm
// are required the same way as always.
// const app = require('remote').require('app')
// const jetpack = require('fs-jetpack').cwd(app.getAppPath())

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMdl from 'vue-mdl'
import games from './components/Games.vue'
import welcome from './components/Welcome.vue'
import reader from './components/Reader.vue'
import writer from './components/Writer.vue'
Vue.use(VueRouter)
Vue.use(VueMdl)

require('material-design-lite-bundled')

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
