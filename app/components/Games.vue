<template>
  <div>
    <br><br><br>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">

        <div class="demo-card-welcome mdl-card mdl-shadow--2dp ">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">
              Ciao {{name}}!
            </h2>
          </div>
          <div class="mdl-card__supporting-text">
            <h4>A cosa vuoi giocare?</h4>

            <button v-link="{path: '/reader'}" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
              Al lettore
            </button>

            <button v-link="{path: '/writer'}" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
              Allo scrittore
            </button>
            
          </div>
      </div>
      <div v-el:snackbar id="snackbar" class="mdl-js-snackbar mdl-snackbar">
        <div class="mdl-snackbar__text"></div>
        <button class="mdl-snackbar__action" type="button"></button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'Games',
  data () {
    return {
      name: store.name
    }
  },

  route: {
    activate: () => {
    }
  }
}
</script>
