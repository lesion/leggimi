<template lang='jade'>
  div.reader
    // e' stata selezionata una storia (sarebbe meglio fare due componenti invece di 'sto troiaio)
    div.reader(v-if='story_id!=="-1"')

      ui-toolbar.header(flat,nav-icon='keyboard_arrow_left',@nav-icon-clicked='back_to_stories')
        div {{stories[story_id]}}
      ui-progress-linear(:show='true',type='determinate',color='primary',:value='current/n*100')
      .footer
        .controls
          ui-icon-button(type='flat',icon='fast_rewind',@click='rewind')
          ui-icon-button(type='flat',:icon='playing?"pause":"play_arrow"',@click='playing?pause():start()')
          ui-icon-button(type='flat',icon='fast_forward',@click='forward')
        ui-slider(:value.sync='opacity',:label='`Trasparenza ${opacity}%`')
        ui-slider(:value.sync='speed',:label='`Velocita (${speed}PPM)`')
      
      .storia(@touchmove='muovo',@touchend='touchend',v-el:diocane)
        span(v-for='word in words',
          track-by='$index',
          :style="{opacity: opacity/100}",
          :class="{active: current==$index}",
          :vindex="$index") {{{word}}}

    // lista di libri
    div(v-else)
      ui-menu(:options='genStories',open-on='always',@option-selected='select_story')

</template>
<script>

import leggimi from '../leggimi'
export default {
  data () {
    return {
      words: [],
      playing: false,
      current: -1,
      stories: leggimi.stories,
      opacity: 15,
      speed: 50,
      n: 0
    }
  },
  computed: {
    delay () {
      return 1500 / this.speed 
    },
    genOpacity () {
      return this.opacity / 100
    },
    genStories () {
      return this.stories.map( (s, i) => ({ id: i, text: s}))
    },
    story_id () { return this.$route.params.story_id }
  },
  created () {
    window.addEventListener('keyup', this.dispatch_keyup)
  },
  destroyed () {
    window.removeEventListener('keyup', this.dispatch_keyup)
  },
  route: {
    data () {
      if(this.story_id === '-1') return

      this.current = -1

      leggimi.getStory(this.story_id)
        .then( ret => {
          this.words = ret.replace(/\n/g, ' ' ).replace(/\r/g, '').split(' ').map(w => w.trim() ).filter( w => w !== '')
          this.n = this.words.length
        })
    },
    deactivate () {
      this.pause()
      this.current = -1
    }
  },

  methods: {
    muovo (e) {
      let touch = e.touches.item(0)
      let word = document.elementFromPoint(touch.clientX, touch.clientY)
      if(word && word.attributes && word.attributes.vindex){
        this.current = parseInt(word.attributes.vindex.value)
      }
      e.preventDefault()
    },
    touchend (e) {
      let touch = e.changedTouches.item(0)
      if (touch.clientX < document.body.clientWidth - 100) return
      let tmpTop = parseInt(this.$els.diocane.style.marginTop) || 0
      this.$els.diocane.style.marginTop = (tmpTop - 55) + 'px'
    },
    back_to_stories () {
      window.history.back()
    },
    select_story (story) {
      this.$router.go(`/reader/${story.id}`)
    },
    dispatch_keyup (ev) {
      if (ev.keyCode === 37) {
        this.rewind()
      }

      if (ev.keyCode === 39) {
        this.forward()
      }
    },

    pause () {
      this.playing = !this.playing
    },

    forward () {
      if( this.current >= this.n ){
        this.pause()
      }

      if( this.playing )
        window.setTimeout(this.forward, this.delay * 10)

      this.current++
      this.$nextTick( () => {
        let tmpTop = parseInt(this.$els.diocane.style.marginTop) || 0
        let word = this.$els.diocane.querySelector('.active')
        if(Math.abs(word.offsetTop - 70) < 10) return
        this.$els.diocane.style.marginTop = (tmpTop - word.offsetTop + 80) + 'px'
      })
    },

    rewind () {
      if (this.current > 0) {
        this.current--
      }
      this.$nextTick( () => {
        let tmpTop = parseInt(this.$els.diocane.style.marginTop) || 0
        let word = this.$els.diocane.querySelector('.active')
        this.$els.diocane.style.marginTop = (tmpTop - word.offsetTop + 80) + 'px'
      })
    },

    start () {
      this.playing = true
      window.setTimeout(this.forward, this.delay * 10)
    }
  }
}
</script>
<style lang='stylus'>
  
  .ui-menu
    max-width: 100%

    .ui-menu-item
      border-bottom: 1px solid #eee
      font-size: 20px
      height: 50px
      color: #888

  .reader 
    height: 100%

  .storia
    margin-top: 0px
    font-size: 4.5vw
    line-height: 25px
    transition: margin .2s ease
    padding-top: 25px


    span
      transition: opacity .5s
      padding-bottom: 30px
      margin-left: 10px
      display: inline-block

      &.active
        opacity: 1 !important

    .light
      opacity: 1

  .header
    z-index: 2
    background-color: white
  
  .footer
    z-index: 2
    background-color: white
    bottom: 0px
    display: flex
    position: absolute
    width: 100%
    border-top: 1px solid #eee
    padding-top: 10px
    box-shadow: 0px 0px 5px #888888

    .controls
      width: 30%
      margin-right: 2%
      text-align: center

    .ui-slider
      margin-right: 2%
      width: 30%

</style>