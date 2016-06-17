<template>
  <div>
    <div v-if="words.length > 0">
        <div class='message'>
            <span>{{message}}</span>
        </div>
        <div class="word-box mdl-cell mdl-cell--3-offset mdl-cell--6-col text-centered mdl-card mdl-shadow--2dp"
             >
            <br>
          <div class="writer-text" v-if='current_word_visible'>
               {{current_word}} 
          </div>
          <div class="word-box mdl-cell mdl-cell--3-offset mdl-cell--6-col text-centered">

              <input class="mdl-textfield__input" type="text" id="sample3" v-model="player_word"><br>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                      @click='check_word'>Prova la parolla</button>
          </div>
          <br><br>
        </div>       
        <div class="controls text-centered">
          <button @click='show_word(1000)'> 1 secondo</button>
          <button @click='show_word(2000)'> 2 secondi</button>
          <button @click='show_word(3000)'> 3 secondi</button>
          
        </div>
    </div>
    <div v-if='words.length == 0'>
        <div v-for='file in word_files'>
            <a @click="read_words(file)">{{file}}</a>
        </div>
    </div>
  </div>

</template>

<script>

// const jetpack = require('fs-jetpack')
// const app = require('electron').remote.require('app')
// var word_dir = app.getAppPath() + '/../assets/parole/'

// console.log(word_dir)

export default {
  data () {
    return {
      score: 0,
      bad_score: 0,
      current_word_visible: false,
      current_word: 'dasdsa',
      message: '',
      player_word: '',
      words: [],
      word_files: [] // jetpack.list(word_dir)
    }
  },

  route: {
    activate () {
      setTimeout(() => {window.componentHandler.upgradeDom()}, 500)
    }
  },

  methods: {
    read_words (filename) {
      var txt = 'pro prova' //JSON.parse(JSON.stringify(jetpack.read(word_dir + filename)))
      this.words = txt.split('\n')
    },

    show_word (time) {
      var idx = Math.floor(Math.random() * (this.words.length))
      console.log(idx)
      this.current_word = this.words[idx]
      this.current_word_visible = true
      setTimeout(() => {this.current_word_visible = false}, time)
    },

    check_word () {
      console.log(this.player_word + ' == ' + this.current_word)
      console.log(this.player_word.localeCompare(this.current_word))
      if (this.current_word_visible.localeCompare(this.current_word) === 0) {
        this.message = 'BRAVO'
        this.score += 1
      } else {
        this.message = 'PECCATO, RIPROVA!'
        this.bad_score += 1
      }
      setTimeout(() => { this.message = ''}, 2000)
    }
  }
}
</script>

<style>

.message {
    text-align:center;
    font-size:5em;
    padding:100px;
}

.writer-text {
    padding:100px;
    font-size:5em;
}

</style>