
import Vue from 'vue'
import VueRouter from 'vue-router'
import Keen from 'keen-ui'

import 'normalize.css/normalize.css'
import 'keen-ui/dist/min/keen-ui.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.scss'

// TOFIX: qui devo importare solo la famiglia che interessa non tutto il polpettone !
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './stylesheets/main.sass'

Vue.use(VueRouter)
Vue.use(Keen)

import games from './components/Games.vue'
import welcome from './components/Welcome.vue'
import reader from './components/Reader.vue'
import writer from './components/Writer.vue'

var router = new VueRouter()
router.map({
  '/games': {
    component: games
  },
  '/reader/:story_id': {
    component: reader
  },
  '/writer': {
    component: writer
  },
  '/welcome': {
    component: welcome
  }
})

router.alias({ '/reader': '/reader/-1' })

var App = Vue.extend({})

router.start(App, '#app')
router.go('/reader')
