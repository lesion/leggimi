<template lang='jade'>
.lista
  ui-menu(:options='genStories',open-on='always',@option-selected='select_story')
</template>

<script>
import leggimi from '../leggimi'
export default {
  name: 'Stories',
  computed: {
    genStories () {
      return leggimi.stories.map( (s, i) => ({ id: i, text: s}))
    },
    story_id () { return this.$route.params.story_id }
  },
  methods: {
    select_story (story) {
      this.$router.go(`/reader/${story.id}`)
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
</style>