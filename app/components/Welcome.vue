<template>
  <div>
    <br><br><br>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">

        <div class="demo-card-welcome mdl-card mdl-shadow--2dp ">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">
              Ciao!
            </h2>
          </div>
          <div class="mdl-card__supporting-text">

            <div class="name-textfield mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" id="sample3" v-model="name">
              <label class="mdl-textfield__label" for="sample3">Dimmi come ti chiami</label>
            </div>
          </div>
          <div class="mdl-card__actions mdl-card--border"><!--fragment-start-->
            <button @click="begin" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
              Iniziamo
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
  data () {
    return {
      name: store.name
    }
  },

  create () {
    console.log('create')
  },

  route: {
    activate () {
      // setTimeout(() => { window.componentHandler.upgradeDom() }, 500)
    }
  },

  methods: {
    begin: function () {
      console.log(this.name)
      if (this.name.length === 0) {
        this.$els.snackbar.MaterialSnackbar.showSnackbar({message: 'Inserisci il tuo nome'})
      } else {
        store.name = this.name
        this.$route.router.go('/games')
      }
    }
  }
}
</script>


<style>
  .demo-card-welcome {
    width:100%;
  }
  .demo-card-welcome .mdl-card__title,
  .demo-card-welcome .mdl-card__menu {
    color: white;
  }
  .demo-card-welcome .mdl-card__title-text {
    font-size:48px !important;
  }

  .demo-card-welcome .mdl-card__title {
    height: 240px;
    background: url('http://www.getmdl.io/assets/demos/welcome_card.jpg') center / cover;
  }

  .name-textfield {
    width:100%;
  }

  .name-textfield .mdl-textfield--floating-label.is-dirty .mdl-textfield__label {
    font-size: 24px !important;
    top: -15px !important;
  }

  .name-textfield .mdl-textfield__input {
    font-size:56px;
  }
  
  .name-textfield .mdl-textfield__label {
    font-size:56px;
    line-height:56px;
  }
  
  .fade {
    transition:opacity 1s;
  }
  .fadeIn {
    opacity:1;
  }

  .fadeOut {
    opacity:0;

  }
</style>
