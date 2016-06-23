
import Vue from 'vue'
import VueRouter from 'vue-router'
import Keen from 'keen-ui'

import 'keen-ui/dist/min/keen-ui.min.css'
// TOFIX: qui devo importare solo la famiglia che interessa non tutto il polpettone !
// import 'roboto-fontface/css/roboto/less/roboto-fontface-light.less'
// 
import './stylesheets/main.sass'

Vue.use(VueRouter)
Vue.use(Keen)

import games from './components/Games'
import welcome from './components/Welcome'
import reader from './components/Reader'
import writer from './components/Writer'
import stories from './components/Stories'

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
  },
  '/stories': {
    component: stories
  }
})

var App = Vue.extend({})

router.start(App, '#app')
router.go('/stories')
