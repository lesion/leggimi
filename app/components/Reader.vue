<template>
  <div>
    <div v-if="story != ''" class='main-story'>
      <a class='back-button' @click="back_to_stories"><i class="flaticon-go-back-left-arrow"></i></a>
      <div class='story-box mdl-cell mdl-cell--8-col mdl-cell--2-offset'>       
        <template v-for="word in words">
          <span v-bind:class="word.class">
            {{{word.text}}}

          </span>
        </template>
      </div>
      <div class='controls mdl-grid'>
        <div class='mdl-cell mdl-cell--4-col mdl-cell--4-offset text-centered'>
          <a @click='rewind'><i class="flaticon-rewind-button"></i></a>
          <a  v-if='!playing' @click='start'><i class="flaticon-play-arrow"></i></a>
          <a v-if='playing' @click='pause'>
            <i v-if='!paused' class="flaticon-pause-button"></i>
            <i v-if='paused' class="flaticon-play-arrow"></i>
          </a>
          <a v-if='playing' @click='stop'><i class="flaticon-stop-button"></i></a>
          <a @click="forward"><i class="flaticon-fast-forward-button"></i></a>
        </div>
        <div class='mdl-cell mdl-cell--4-col text-righted'>
          Velocita': <input type="text" v-model="delay" placeholder="edit me">
        </div>
      </div>
    </div>
    <div v-else>
      <ul class="story-list-item mdl-list">
        <li class="mdl-list__item" v-for="story in stories">
          <span class="mdl-list__item-primary-content">
            <a @click="select_story(story)">{{story}}</a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
const jetpack = require('fs-jetpack')
const app = require('electron').remote.require('app')
var story_dir = app.getAppPath() + '/../assets/storie/'

export default {
  data () {
    return {
      story: '',
      story_text: '',
      story_text_html: '',
      words: [],
      delay: 100,
      playing: false,
      paused: false,
      current: -1,
      stories: jetpack.list(story_dir)
    }
  },

  created () {
    console.log('reader created')
    window.addEventListener('keyup', this.dispatch_keyup)
  },

  route: {
    activate () {
      var path = app.getAppPath()
      console.log(path)
    },

    deactivate () {
      this.stop()
    }
  },

  methods: {
    dispatch_keyup (ev) {
      if (ev.keyCode === 37) {
        this.rewind()
      }

      if (ev.keyCode === 39) {
        this.forward()
      }
    },

    select_story (filename) {
      this.story_text = jetpack.read(story_dir + filename, 'buf')
      this.story = filename
      this.transform_text(this.story_text)
    },

    transform_text (txt) {
      this.words = []
      txt = JSON.parse(JSON.stringify(txt))
      var word = ''
      var br_counter = 0
      txt.data.map((char, index) => {
        if (char !== 10) {
          if (char !== 13 && char !== 32) {
            if (br_counter >= 0) {
              br_counter = 0
            }
            word += String.fromCharCode(char)
          } else {
            if (word.length > 0) {
              this.words.push({text: word, index: index, class: 'normal'})
            }
            if (char === 13 && br_counter >= 0) {
              br_counter++

              if (br_counter === 1) {
                this.words.push({text: '<br>', index: index})
              }

              if (br_counter === 2) {
                br_counter = -1
              }
            }
            word = ''
          }
        }
      })
    },

    update_words () {
      if (!this.paused) {
        this.forward()
      }

      if (this.current === this.words.length || !this.playing) {
        this.stop()
      } else {
        window.setTimeout(() => { this.update_words() }, this.delay * 10)
      }
    },

    pause () {
      this.paused = !this.paused
    },

    forward () {
      console.log(this.current)
      if (!this.playing && !this.paused) {
        this.words.map(word => { word.class = 'light' })
      }

      if (this.current >= 0) {
        this.words[this.current].class = 'light'
      }

      if (this.current < this.words.length) {
        this.current++
        this.words[this.current].class = 'normal'
      }
    },

    rewind () {
      if (this.current > 0) {
        if (!this.playing) {
          this.words.map(word => { word.class = 'light' })
        }
        this.words[this.current].class = 'light'
        this.current--
        this.words[this.current].class = 'normal'
      }
    },

    start () {
      console.log('start')
      this.words.map(word => { word.class = 'light'})
      this.playing = true
      window.setTimeout(() => { this.update_words() }, this.delay * 10)
    },

    stop () {
      console.log('stop')
      this.words.map(word => { word.class = 'normal'})
      this.playing = false
      this.paused = false
      this.current = -1
    },

    back_to_stories () {
      this.story = ''
      this.story_text = ''
    }
  }
}
</script>
  

<style>
  .story-box span {
    font-size:3em;
    line-height: 1.5em;
    transition:opacity 200ms;
  }

  .normal {
    opacity:1;
  }
  
  .light {
    opacity:0.1;
  }

  .main-story {
    padding:50px;
    margin-bottom:150px;
  }

  .controls {
    position:fixed;
    bottom:40px;
    background:rgba(0,0,0,0.7);
    width:80%;
    margin:0px 10%;
    padding:20px;
    border-radius: 50px;
  }
</style>